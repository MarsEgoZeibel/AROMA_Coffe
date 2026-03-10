/* ════════════════════════════════════════════════════════════════
   RESERVATION.JS  —  форма бронирования столика.
   Кастомный счётчик гостей + обработка отправки формы.
   ════════════════════════════════════════════════════════════════ */

(function () {

  /* ── Счётчик гостей ─────────────────────────────────────────── */
  const decBtn    = document.getElementById('guestDec');
  const incBtn    = document.getElementById('guestInc');
  const valDisplay = document.getElementById('guestVal');
  const hiddenInput = document.getElementById('guestCount');

  const MIN = 1;
  const MAX = 20;
  let count = 2;   /* начальное значение */

  function updateCounter() {
    valDisplay.textContent  = count;
    hiddenInput.value       = count;
    decBtn.disabled         = count <= MIN;
    incBtn.disabled         = count >= MAX;
  }

  if (decBtn && incBtn) {
    decBtn.addEventListener('click', () => { if (count > MIN) { count--; updateCounter(); } });
    incBtn.addEventListener('click', () => { if (count < MAX) { count++; updateCounter(); } });
    updateCounter();   /* инициализация */
  }


  /* ── Минимальная дата: сегодня ──────────────────────────────── */
  const dateInput = document.getElementById('resDate');
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.min   = today;
    dateInput.value = today;
  }


  /* ── Обработка отправки формы ───────────────────────────────── */
  const form      = document.getElementById('reservationForm');
  const successMsg = document.getElementById('formSuccess');
  const submitBtn  = form ? form.querySelector('[type="submit"]') : null;

  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();

      /* Простая валидация (браузерная required уже отработала) */
      const name  = form.querySelector('[name="name"]').value.trim();
      const phone = form.querySelector('[name="phone"]').value.trim();

      if (!name || !phone) return;

      /* Имитация отправки */
      submitBtn.textContent = 'Отправляем…';
      submitBtn.disabled    = true;

      setTimeout(() => {
        /* Успех */
        form.style.display = 'none';
        if (successMsg) successMsg.style.display = 'block';
      }, 1200);
    });
  }


  /* ── Маска телефона ─────────────────────────────────────────── */
  const phoneInput = form ? form.querySelector('[name="phone"]') : null;
  if (phoneInput) {
    phoneInput.addEventListener('input', function () {
      /* Оставляем только цифры, форматируем +7 (XXX) XXX-XX-XX */
      let digits = this.value.replace(/\D/g, '');

      /* БАГ-ФИКС: если поле полностью очищено — не вставляем +7 принудительно */
      if (digits.length === 0) { this.value = ''; return; }

      if (digits.startsWith('8')) digits = '7' + digits.slice(1);
      if (!digits.startsWith('7')) digits = '7' + digits;
      digits = digits.slice(0, 11);

      let formatted = '+7';
      if (digits.length > 1)  formatted += ' (' + digits.slice(1, 4);
      if (digits.length >= 4) formatted += ') ' + digits.slice(4, 7);
      if (digits.length >= 7) formatted += '-' + digits.slice(7, 9);
      if (digits.length >= 9) formatted += '-' + digits.slice(9, 11);

      this.value = formatted;
    });
  }

})();
