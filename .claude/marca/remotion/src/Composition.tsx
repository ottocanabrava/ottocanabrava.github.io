import { useMemo } from "react";
import {
  AbsoluteFill,
  Composition,
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { evolvePath, getLength, getPointAtLength } from "@remotion/paths";
import logo from "./logo.json";

// Choreography:
// 1. otto is drawn; the red dot lands in the cut of the second o (the o is whole).
// 2. the second o duplicates: the copy slides right and opens into the C of Canabrava, carrying the dot.
// 3. the dot writes the rest of the name, like a pen.
// 4. the dot hops back over the name into the first cut, closing the o again.

// Site tokens, light and dark (--bg, --ink, --fire).
const THEMES = {
  claro: { bg: "#F7F7F5", ink: "#0E0F12", fire: "#E5482A" },
  escuro: { bg: "#0C0D0F", ink: "#EDEDEA", fire: "#F2583A" },
};
type Props = { tema: keyof typeof THEMES };
const SPEED = 900; // writing speed, logo units per second (constant, like a hand)
const PEN_LIFT = 0.12; // pen glide between strokes, s
const SLIDE = 1.0; // duplicate slides from the o to the C, s
const RETURN = 0.9; // hop back into the cut, s
const HOP = 150; // arc height of the hop, logo units (clears the b ascender)
const HOLD = 1.6; // finished logo on screen, s

const [LENS_X, MID, R] = logo.lens;
const [CUT_AT, CLOSED] = logo.cut;
const [C_X, C_OPEN] = logo.cGlyph;

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const lerp = (a: number, b: number, k: number) => a + (b - a) * k;

// Strokes are never empty, so a missing point is a bug in the logo data: fail loudly.
const at = (d: string, len: number) => {
  const p = getPointAtLength(d, len);
  if (!p) throw new Error(`no point on path at ${len}`);
  return p;
};

// An o of radius R centred at (cx, MID), cut around CUT_AT by ±half degrees. Same geometry as Fonte Otto.
const ring = (cx: number, half: number) => {
  const p = (deg: number) => {
    const a = (deg * Math.PI) / 180;
    return `${cx + R * Math.cos(a)} ${MID - R * Math.sin(a)}`;
  };
  return `M${p(CUT_AT + half)} A${R} ${R} 0 1 0 ${p(CUT_AT - half)}`;
};
const cutPoint = (cx: number) => ({ x: cx + R, y: MID });

type Stroke = { d: string; butt: boolean; len: number; start: number; dur: number };

const useTimeline = (fps: number) =>
  useMemo(() => {
    const draw = (p: { d: string; butt: boolean }, t: number, speed: number): Stroke => {
      const len = getLength(p.d);
      return { d: p.d, butt: p.butt, len, start: t, dur: len / speed };
    };
    let t = 0.3;
    const otto = logo.paths.slice(0, logo.nOtto).map((p) => {
      const s = draw(p, t, SPEED * 1.4);
      t = s.start + s.dur + 0.04;
      return s;
    });
    const dotIn = t + 0.05;
    const slideStart = dotIn + 0.7; // the whole o rests a beat
    const slideEnd = slideStart + SLIDE;
    t = slideEnd + PEN_LIFT;
    // the name minus its c (the c is the duplicated o)
    const rest = logo.paths.slice(logo.cIndex + 1).map((p) => {
      const s = draw(p, t, SPEED);
      t = s.start + s.dur + PEN_LIFT;
      return s;
    });
    const writeEnd = t;
    const home = writeEnd - PEN_LIFT + RETURN;
    return { otto, rest, dotIn, slideStart, slideEnd, writeEnd, home, total: Math.ceil((home + 0.4 + HOLD) * fps) };
  }, [fps]);

export const LogoAnimation: React.FC<Props> = ({ tema }) => {
  const c = THEMES[tema];
  const frame = useCurrentFrame();
  const { fps, width } = useVideoConfig();
  const { otto, rest, dotIn, slideStart, slideEnd, writeEnd, home } = useTimeline(fps);
  const t = frame / fps;

  const progress = (s: Stroke) =>
    interpolate(t, [s.start, s.start + s.dur], [0, 1], { ...clamp, easing: Easing.bezier(0.45, 0, 0.55, 1) });

  // The duplicate: slides from the o to the C and opens on the way.
  const k = interpolate(t, [slideStart, slideEnd], [0, 1], { ...clamp, easing: Easing.bezier(0.65, 0, 0.35, 1) });
  const copyX = lerp(LENS_X, C_X, k);
  const copyHalf = lerp(CLOSED, C_OPEN, k);

  // Pen: in the cut, then riding in the copy's opening, then writing, then hopping home.
  let pen = cutPoint(LENS_X);
  if (t >= slideStart) pen = cutPoint(copyX);
  if (t >= slideEnd) {
    const active = rest.findIndex((s) => t < s.start + s.dur);
    if (active === -1) {
      const last = rest[rest.length - 1];
      const end = at(last.d, last.len);
      const home0 = cutPoint(LENS_X);
      const h = interpolate(t, [writeEnd - PEN_LIFT, home], [0, 1], { ...clamp, easing: Easing.inOut(Easing.cubic) });
      pen = { x: lerp(end.x, home0.x, h), y: lerp(end.y, home0.y, h) - HOP * Math.sin(Math.PI * h) };
    } else {
      const s = rest[active];
      if (t >= s.start) {
        pen = at(s.d, progress(s) * s.len);
      } else {
        const from = active === 0 ? cutPoint(C_X) : at(rest[active - 1].d, rest[active - 1].len);
        const prevEnd = active === 0 ? slideEnd : rest[active - 1].start + rest[active - 1].dur;
        const to = at(s.d, 0);
        const g = interpolate(t, [prevEnd, s.start], [0, 1], { ...clamp, easing: Easing.inOut(Easing.quad) });
        pen = { x: lerp(from.x, to.x, g), y: lerp(from.y, to.y, g) };
      }
    }
  }

  // The dot lands in the cut with a spring, and lands there again at the end.
  const land = spring({ frame: frame - dotIn * fps, fps, config: { damping: 11, stiffness: 160 } });
  const settle = spring({ frame: frame - home * fps, fps, config: { damping: 9, stiffness: 180 } });
  const dotScale = t < home ? land : 0.6 + 0.4 * settle; // low damping: overshoots, then settles

  const scale = (width * 0.8) / logo.width;
  const strokeOf = (s: Stroke, i: number) => {
    const p = progress(s);
    if (p === 0) return null;
    const { strokeDasharray, strokeDashoffset } = evolvePath(p, s.d);
    return (
      <path
        key={i}
        d={s.d}
        strokeLinecap={s.butt ? "butt" : "round"}
        strokeDasharray={strokeDasharray}
        strokeDashoffset={strokeDashoffset}
      />
    );
  };

  return (
    <AbsoluteFill style={{ backgroundColor: c.bg, justifyContent: "center", alignItems: "center" }}>
      <svg
        viewBox={`0 0 ${logo.width} ${logo.height}`}
        width={logo.width * scale}
        height={logo.height * scale}
        style={{ overflow: "visible" }}
      >
        <g fill="none" stroke={c.ink} strokeWidth={logo.stroke} strokeLinejoin="round">
          {otto.map(strokeOf)}
          {t >= slideStart && <path d={ring(copyX, copyHalf)} strokeLinecap="butt" />}
          {rest.map((s, i) => strokeOf(s, i + 100))}
        </g>
        {t >= dotIn && <circle cx={pen.x} cy={pen.y} r={logo.dotR * dotScale} fill={c.fire} />}
      </svg>
    </AbsoluteFill>
  );
};

export const MyComposition = () => {
  const fps = 60;
  const durationInFrames = useTimeline(fps).total;
  return (
    <>
      <Composition
        id="LogoOtto"
        component={LogoAnimation}
        durationInFrames={durationInFrames}
        fps={fps}
        width={1920}
        height={1080}
        defaultProps={{ tema: "claro" } as Props}
      />
      <Composition
        id="LogoOttoEscuro"
        component={LogoAnimation}
        durationInFrames={durationInFrames}
        fps={fps}
        width={1920}
        height={1080}
        defaultProps={{ tema: "escuro" } as Props}
      />
      <Composition
        id="LogoOttoQuadrado"
        component={LogoAnimation}
        durationInFrames={durationInFrames}
        fps={fps}
        width={1080}
        height={1080}
        defaultProps={{ tema: "claro" } as Props}
      />
    </>
  );
};
