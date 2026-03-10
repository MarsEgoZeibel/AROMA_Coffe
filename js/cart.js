/* ════════════════════════════════════════════════════════════════
   CART.JS  —  визуальная обратная связь кнопок «Добавить».
   Временно меняет состояние кнопки на «Добавлено ✓».
   ════════════════════════════════════════════════════════════════ */

const addBtns = document.querySelectorAll('.btn-add');

addBtns.forEach(btn => {
  btn.addEventListener('click', e => {
    /* БАГ-ФИКС: останавливаем всплытие, чтобы клик не дошёл
       до .menu-card-trigger и не открыл модальное окно */
    e.stopPropagation();
    /* Если кнопка уже в состоянии «добавлено» — ничего не делаем */
    if (btn.classList.contains('added')) return;

    /* Сохраняем исходный текст */
    const originalText = btn.textContent;

    /* Переключаем в состояние «добавлено» */
    btn.textContent = '✓ Добавлено';
    btn.classList.add('added');
    btn.disabled = true;

    /* Через 1.6 с возвращаем в исходное состояние */
    setTimeout(() => {
      btn.textContent = originalText;
      btn.classList.remove('added');
      btn.disabled = false;
    }, 1600);
  });
});


/* ── Ken-burns-эффект hero-изображения при загрузке страницы ── */
/* (небольшой скрипт здесь, т.к. связан с визуальным состоянием) */
document.addEventListener('DOMContentLoaded', () => {
  const heroBg = document.querySelector('.hero-bg');
  if (heroBg) {
    /* Класс .loaded запускает CSS-transition scale(1.06 → 1) */
    requestAnimationFrame(() => heroBg.classList.add('loaded'));
  }
});
