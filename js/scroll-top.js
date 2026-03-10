/* ════════════════════════════════════════════════════════════════
   SCROLL-TOP.JS  —  кнопка «Наверх» + полоса прогресса чтения.
   ════════════════════════════════════════════════════════════════ */

(function () {

  const scrollBtn   = document.getElementById('scrollTop');
  const progressBar = document.getElementById('progressBar');

  if (!scrollBtn) return;

  /* ── Обновление при прокрутке ───────────────────────────────── */
  function onScroll() {
    const scrolled = window.scrollY;
    const docH     = document.documentElement.scrollHeight - window.innerHeight;

    /* Показываем кнопку после 400px прокрутки */
    scrollBtn.classList.toggle('visible', scrolled > 400);

    /* Обновляем ширину полосы прогресса */
    if (progressBar) {
      const pct = docH > 0 ? (scrolled / docH) * 100 : 0;
      progressBar.style.width = pct.toFixed(1) + '%';
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  /* ── Клик: плавный скролл наверх ────────────────────────────── */
  scrollBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

})();
