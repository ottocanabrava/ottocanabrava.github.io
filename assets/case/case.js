/* =====================================================================
   Componentes compartilhados dos cases do portfólio — comportamento
   Fonte de verdade: documentos-verificaveis/index.html (script "Seções de texto").
   O fio do fechamento (.end-row) e as seções de texto (.ln, .cols) se desenham uma vez, quando entram na tela.
   Com movimento reduzido ou sem IntersectionObserver, aparece no estado final.
   Requer, no <head> da página: <script>document.documentElement.classList.add("js");</script>
   Uso: .claude/template-de-cases.md
   ===================================================================== */
(function(){
  var d = document.documentElement;
  if(window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches) d.classList.add("static");
  var pronto = !("IntersectionObserver" in window) || d.classList.contains("static");
  function revela(els){
    if(pronto){ Array.prototype.forEach.call(els, function(l){ l.classList.add("on"); }); return; }
    Array.prototype.forEach.call(els, function(l){
      var o = new IntersectionObserver(function(en){ if(en[0].isIntersecting){ l.classList.add("on"); o.disconnect(); } }, { rootMargin: "0px 0px -20% 0px" });
      o.observe(l);
    });
  }
  /* seções de texto: a linha de pontos (.ln) e as colunas (.cols) se desenham uma vez, quando entram na tela */
  revela(document.querySelectorAll(".ln, .cols"));
  var els = document.querySelectorAll(".end-row");
  if(!els.length) return;
  revela(els);
  if(pronto) return;
  /* quando o fechamento é o fim da página (sem rodapé depois), a margem de 20% nunca é cruzada: no fim da rolagem, revela */
  function end(){ if(innerHeight + scrollY >= document.documentElement.scrollHeight - 2){ Array.prototype.forEach.call(els, function(l){ l.classList.add("on"); }); removeEventListener("scroll", end); } }
  addEventListener("scroll", end, { passive: true }); end();
})();
