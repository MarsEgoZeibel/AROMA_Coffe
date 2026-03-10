/* ════════════════════════════════════════════════════════════════
   MENU.JS  —  фильтрация карточек меню по категории.
   Клик на таб скрывает/показывает карточки с анимацией fade.
   ════════════════════════════════════════════════════════════════ */

/* БАГ-ФИКС: было '.btn-tab' — захватывало кнопки галереи тоже.
   Ограничиваем только кнопками внутри .menu-tabs */
const tabs  = document.querySelectorAll('.menu-tabs .btn-tab');
const cards = document.querySelectorAll('.menu-card');

/**
 * Фильтрует карточки по data-атрибуту.
 * @param {string} cat  — категория ('all' | 'coffee' | 'milk' | …)
 * @param {Element} activeTab — кликнутый таб (для установки .active)
 */
function filterMenu(cat, activeTab) {
  /* Обновляем активный таб */
  tabs.forEach(t => t.classList.remove('active'));
  activeTab.classList.add('active');

  /* Показываем / скрываем карточки */
  cards.forEach(card => {
    const match = cat === 'all' || card.dataset.cat === cat;

    if (match) {
      card.removeAttribute('hidden');
      /* Небольшой fade-in для наглядности */
      card.style.opacity = '0';
      requestAnimationFrame(() => {
        card.style.transition = 'opacity .25s';
        card.style.opacity    = '1';
      });
    } else {
      card.setAttribute('hidden', '');
      card.style.opacity = '';
      card.style.transition = '';
    }
  });
}

/* Привязываем обработчики к табам */
tabs.forEach(tab => {
  tab.addEventListener('click', () => filterMenu(tab.dataset.filter, tab));
});
