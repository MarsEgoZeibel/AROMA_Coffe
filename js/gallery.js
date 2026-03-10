/* ════════════════════════════════════════════════════════════════
   GALLERY.JS  —  фильтр галереи + лайтбокс.
   ════════════════════════════════════════════════════════════════ */

(function () {

  /* ── Фильтр галереи ─────────────────────────────────────────── */
  /* БАГ-ФИКС: было '.gallery-tab' — класса нет в HTML.
     Уточняем селектор до кнопок внутри .gallery-filter */
  const filterBtns   = document.querySelectorAll('.gallery-filter .btn-tab');
  const galleryItems = document.querySelectorAll('.gallery-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      /* Активный таб */
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.gfilter;

      /* Показ / скрытие с fade */
      galleryItems.forEach(item => {
        const match = filter === 'all' || item.dataset.gcat === filter;

        if (match) {
          item.removeAttribute('hidden');
          item.style.opacity = '0';
          requestAnimationFrame(() => {
            item.style.transition = 'opacity .3s';
            item.style.opacity    = '1';
          });
        } else {
          item.setAttribute('hidden', '');
          item.style.opacity   = '';
          item.style.transition = '';
        }
      });
    });
  });


  /* ── Лайтбокс ───────────────────────────────────────────────── */
  const lightbox     = document.getElementById('lightbox');
  const lbImg        = document.getElementById('lbImg');
  const lbCaption    = document.getElementById('lbCaption');
  const lbClose      = document.getElementById('lbClose');
  const lbPrev       = document.getElementById('lbPrev');
  const lbNext       = document.getElementById('lbNext');

  if (!lightbox) return;

  /* Коллекция видимых элементов (обновляется при фильтре) */
  let visibleItems  = [];
  let currentLbIdx  = 0;

  function getVisible() {
    return [...galleryItems].filter(item => !item.hasAttribute('hidden'));
  }

  /* Открыть лайтбокс */
  function openLightbox(item) {
    visibleItems = getVisible();
    currentLbIdx = visibleItems.indexOf(item);

    updateLightbox();
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
    lbClose.focus();
  }

  /* Обновить изображение и подпись */
  function updateLightbox() {
    const item = visibleItems[currentLbIdx];
    const img  = item.querySelector('img');
    lbImg.src        = img.src;
    lbImg.alt        = img.alt;
    lbCaption.textContent = img.alt;

    /* Навигационные кнопки: скрываем если один элемент */
    lbPrev.style.display = visibleItems.length > 1 ? '' : 'none';
    lbNext.style.display = visibleItems.length > 1 ? '' : 'none';
  }

  /* Закрыть */
  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  /* Предыдущее/следующее */
  function prevImg() {
    currentLbIdx = (currentLbIdx - 1 + visibleItems.length) % visibleItems.length;
    updateLightbox();
  }
  function nextImg() {
    currentLbIdx = (currentLbIdx + 1) % visibleItems.length;
    updateLightbox();
  }

  /* Клик на элемент галереи */
  galleryItems.forEach(item => {
    item.addEventListener('click', () => openLightbox(item));
  });

  /* Кнопки */
  lbClose.addEventListener('click', closeLightbox);
  lbPrev.addEventListener('click',  prevImg);
  lbNext.addEventListener('click',  nextImg);

  /* Клик по тёмному фону */
  lightbox.addEventListener('click', e => {
    if (e.target === lightbox) closeLightbox();
  });

  /* Клавиатура */
  document.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape')     closeLightbox();
    if (e.key === 'ArrowLeft')  prevImg();
    if (e.key === 'ArrowRight') nextImg();
  });

  /* Touch-свайп в лайтбоксе */
  let lbTouchX = 0;
  lightbox.addEventListener('touchstart', e => {
    lbTouchX = e.touches[0].clientX;
  }, { passive: true });
  lightbox.addEventListener('touchend', e => {
    const diff = lbTouchX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) diff > 0 ? nextImg() : prevImg();
  }, { passive: true });

})();
