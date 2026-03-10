/* ════════════════════════════════════════════════════════════════
   MODAL.JS  —  модальные окна для карточек меню.
   Клик на карточку → читаем data-атрибуты → заполняем модал.
   ════════════════════════════════════════════════════════════════ */

const overlay    = document.getElementById('modalOverlay');
const modalImg   = document.getElementById('modalImg');
const modalTag   = document.getElementById('modalTag');
const modalTitle = document.getElementById('modalTitle');
const modalDesc  = document.getElementById('modalDesc');
const modalWeight = document.getElementById('modalWeight');
const modalCal   = document.getElementById('modalCal');
const modalAlrg  = document.getElementById('modalAlrg');
const modalPrice = document.getElementById('modalPrice');
const modalClose = document.getElementById('modalClose');
const modalAddBtn = document.getElementById('modalAddBtn');


/* ── Открыть модал ──────────────────────────────────────────── */
function openModal(card) {
  /* Читаем данные из data-атрибутов карточки */
  modalImg.src           = card.dataset.img   || '';
  modalImg.alt           = card.dataset.title || '';
  modalTag.textContent   = card.dataset.tag   || '';
  modalTitle.textContent = card.dataset.title || '';
  modalDesc.textContent  = card.dataset.desc  || '';
  modalWeight.textContent = card.dataset.weight || '—';
  modalCal.textContent   = card.dataset.cal   || '—';
  modalAlrg.textContent  = card.dataset.allergens || 'Нет';
  modalPrice.textContent = (card.dataset.price || '0') + ' ₽';

  /* Сбрасываем кнопку «Добавить» */
  modalAddBtn.textContent = '+ Добавить в заказ';
  modalAddBtn.classList.remove('added');
  modalAddBtn.disabled = false;

  /* Показываем оверлей */
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';

  /* Фокус на кнопке закрытия для доступности */
  modalClose.focus();
}


/* ── Закрыть модал ──────────────────────────────────────────── */
function closeModal() {
  overlay.classList.remove('open');
  document.body.style.overflow = '';
}


/* ── Слушатели событий ──────────────────────────────────────── */

/* Клик на кнопку «Подробнее» внутри карточки */
document.querySelectorAll('.menu-card-trigger').forEach(card => {
  card.addEventListener('click', () => openModal(card));
});

/* Кнопка закрытия × */
modalClose.addEventListener('click', closeModal);

/* Клик по тёмному оверлею (не по диалогу) */
overlay.addEventListener('click', e => {
  if (e.target === overlay) closeModal();
});

/* Клавиша Escape */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && overlay.classList.contains('open')) closeModal();
});

/* Кнопка «Добавить» в модале */
modalAddBtn.addEventListener('click', () => {
  if (modalAddBtn.classList.contains('added')) return;

  const original = modalAddBtn.textContent;
  modalAddBtn.textContent = '✓ Добавлено';
  modalAddBtn.classList.add('added');
  modalAddBtn.disabled = true;

  setTimeout(() => {
    modalAddBtn.textContent = original;
    modalAddBtn.classList.remove('added');
    modalAddBtn.disabled = false;
  }, 1800);
});
