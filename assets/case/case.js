/* =====================================================================
   Componentes compartilhados dos cases do portfólio — comportamento
   Fonte de verdade: documentos-verificaveis/index.html (script "Seções de texto").
   O fio do fechamento (.end-row) se desenha uma vez, quando entra na tela.
   Com movimento reduzido ou sem IntersectionObserver, aparece no estado final.
   Requer, no <head> da página: <script>document.documentElement.classList.add("js");</script>
   Uso: .claude/template-de-cases.md
   ===================================================================== */
(function(){
  var d = document.documentElement;
  if(window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches) d.classList.add("static");
  var els = document.querySelectorAll(".end-row");
  if(!els.length) return;
  if(!("IntersectionObserver" in window) || d.classList.contains("static")){ Array.prototype.forEach.call(els, function(l){ l.classList.add("on"); }); return; }
  Array.prototype.forEach.call(els, function(l){
    var o = new IntersectionObserver(function(en){ if(en[0].isIntersecting){ l.classList.add("on"); o.disconnect(); } }, { rootMargin: "0px 0px -20% 0px" });
    o.observe(l);
  });
  /* quando o fechamento é o fim da página (sem rodapé depois), a margem de 20% nunca é cruzada: no fim da rolagem, revela */
  function end(){ if(innerHeight + scrollY >= document.documentElement.scrollHeight - 2){ Array.prototype.forEach.call(els, function(l){ l.classList.add("on"); }); removeEventListener("scroll", end); } }
  addEventListener("scroll", end, { passive: true }); end();
})();
