/* ════════════════════════════════════════════════════════════════
   NAV.JS  —  поведение навигационной панели:
   1. Класс .scrolled при прокрутке (матовое стекло)
   2. Мобильное меню-шторка (бургер-кнопка)
   ════════════════════════════════════════════════════════════════ */

const nav    = document.querySelector('.nav');
const burger = document.querySelector('.nav-burger');
const drawer = document.querySelector('.nav-drawer');

/* ── 1. Добавляем .scrolled при скролле ────────────────────── */
function handleScroll() {
  // Порог 60px — чуть ниже навбара
  nav.classList.toggle('scrolled', window.scrollY > 60);
}
window.addEventListener('scroll', handleScroll, { passive: true });
handleScroll();  // вызываем сразу (страница могла открыться mid-scroll)


/* ── 2. Мобильное меню ──────────────────────────────────────── */
function toggleDrawer(open) {
  burger.classList.toggle('open', open);
  drawer.classList.toggle('open', open);
  // Блокируем скролл страницы когда меню открыто
  document.body.style.overflow = open ? 'hidden' : '';
}

burger.addEventListener('click', () => {
  const isOpen = drawer.classList.contains('open');
  toggleDrawer(!isOpen);
});

/* Закрывать шторку при клике на ссылку внутри неё */
drawer.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => toggleDrawer(false));
});

/* Закрывать при нажатии Escape */
document.addEventListener('keydown', e => {
  /* БАГ-ФИКС: вызываем toggleDrawer только если шторка реально открыта */
  if (e.key === 'Escape' && drawer.classList.contains('open')) toggleDrawer(false);
});
