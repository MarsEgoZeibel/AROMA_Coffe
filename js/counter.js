/* ════════════════════════════════════════════════════════════════
   COUNTER.JS  —  анимированный счётчик статистики.
   Числа «отсчитываются» от 0 до целевого значения когда
   секция «О нас» появляется в viewport.
   ════════════════════════════════════════════════════════════════ */

(function () {

  const statNums = document.querySelectorAll('.stat-num[data-target]');
  if (statNums.length === 0) return;

  /* ── Функция анимации одного числа ─────────────────────────── */
  /**
   * @param {Element} el     — элемент с числом
   * @param {number}  target — целевое значение
   * @param {string}  suffix — суффикс ('+', 'k', '' …)
   * @param {number}  duration — длительность (мс)
   */
  function animateCounter(el, target, suffix, duration = 1600) {
    const startTime = performance.now();

    function update(now) {
      const elapsed  = now - startTime;
      const progress = Math.min(elapsed / duration, 1);

      /* Плавное замедление в конце (ease-out cubic) */
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.round(eased * target);

      el.textContent = value + suffix;

      if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
  }

  /* ── Intersection Observer: запускаем когда секция видна ────── */
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      /* Запускаем анимацию для каждого счётчика */
      statNums.forEach(el => {
        const target = parseInt(el.dataset.target, 10);
        const suffix = el.dataset.suffix || '';
        animateCounter(el, target, suffix);
      });

      /* Наблюдать только один раз */
      observer.disconnect();
    });
  }, { threshold: 0.5 });

  /* Следим за секцией «О нас» */
  const aboutSection = document.querySelector('.about');
  if (aboutSection) observer.observe(aboutSection);

})();
