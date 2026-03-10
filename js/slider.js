/* ════════════════════════════════════════════════════════════════
   SLIDER.JS  —  слайдер отзывов с автопрокруткой.
   Поддерживает: стрелки, точки, свайп, Intersection Observer.
   ════════════════════════════════════════════════════════════════ */

(function () {

  const track    = document.querySelector('.slider-track');
  const slides   = document.querySelectorAll('.slide');
  const dots     = document.querySelectorAll('.dot');
  const btnPrev  = document.getElementById('sliderPrev');
  const btnNext  = document.getElementById('sliderNext');

  if (!track || slides.length === 0) return;

  let current   = 0;                 /* текущий индекс слайда         */
  let autoTimer = null;              /* таймер автопрокрутки          */
  const INTERVAL = 5000;            /* интервал автопрокрутки (мс)   */

  /* ── Переключить слайд ──────────────────────────────────────── */
  function goTo(index) {
    /* Ограничиваем индекс */
    if (index < 0) index = slides.length - 1;
    if (index >= slides.length) index = 0;

    current = index;

    /* Двигаем трек */
    track.style.transform = `translateX(-${current * 100}%)`;

    /* Обновляем точки */
    dots.forEach((dot, i) => dot.classList.toggle('active', i === current));

    /* Обновляем стрелки: не отключаем — зацикленный слайдер */
  }

  /* ── Автопрокрутка ──────────────────────────────────────────── */
  function startAuto() {
    stopAuto();
    autoTimer = setInterval(() => goTo(current + 1), INTERVAL);
  }
  function stopAuto() {
    if (autoTimer) clearInterval(autoTimer);
  }

  /* ── Кнопки ────────────────────────────────────────────────── */
  btnPrev.addEventListener('click', () => { goTo(current - 1); startAuto(); });
  btnNext.addEventListener('click', () => { goTo(current + 1); startAuto(); });

  /* ── Точки ──────────────────────────────────────────────────── */
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => { goTo(i); startAuto(); });
  });

  /* ── Клавиатура ─────────────────────────────────────────────── */
  document.addEventListener('keydown', e => {
    /* БАГ-ФИКС: не перехватываем стрелки когда открыт лайтбокс галереи */
    const lb = document.getElementById('lightbox');
    if (lb && lb.classList.contains('open')) return;

    if (e.key === 'ArrowLeft')  { goTo(current - 1); startAuto(); }
    if (e.key === 'ArrowRight') { goTo(current + 1); startAuto(); }
  });

  /* ── Свайп (touch) ──────────────────────────────────────────── */
  let touchStartX = 0;

  track.addEventListener('touchstart', e => {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });

  track.addEventListener('touchend', e => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {   /* порог 50px */
      goTo(diff > 0 ? current + 1 : current - 1);
      startAuto();
    }
  }, { passive: true });

  /* ── Пауза на hover / focus ─────────────────────────────────── */
  const sliderSection = document.querySelector('.testimonials');
  sliderSection.addEventListener('mouseenter', stopAuto);
  sliderSection.addEventListener('mouseleave', startAuto);
  sliderSection.addEventListener('focusin',    stopAuto);
  sliderSection.addEventListener('focusout',   startAuto);

  /* ── Пауза когда секция вне viewport (Intersection Observer) ── */
  const observer = new IntersectionObserver(entries => {
    entries[0].isIntersecting ? startAuto() : stopAuto();
  }, { threshold: 0.3 });
  observer.observe(sliderSection);

  /* ── Инициализация ──────────────────────────────────────────── */
  goTo(0);
  startAuto();

})();
