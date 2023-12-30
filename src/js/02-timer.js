import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const elements = {
  btnStart: document.querySelector('[data-start]'),
  input: document.querySelector('#datetime-picker'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

elements.btnStart.disabled = true;

flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    // console.log(selectedDates[0]);
    const currentDate = new Date();

    const targetDate = selectedDates[0];

    if (targetDate <= currentDate) {
      elements.btnStart.disabled = true;
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      elements.btnStart.disabled = false;
    }
  },
});

elements.btnStart.addEventListener('click', handlerStart);

function handlerStart(evt) {
  elements.btnStart.disabled = true;
  elements.input.disabled = true;

  const id = setInterval(() => {
    const currentDate = new Date();
    const targetDate = new Date(elements.input.value);

    const result = targetDate - currentDate;

    function convertMs(ms) {
      // Number of milliseconds per unit of time
      const second = 1000;
      const minute = second * 60;
      const hour = minute * 60;
      const day = hour * 24;

      // Remaining days
      const days = Math.floor(ms / day);
      // Remaining hours
      const hours = Math.floor((ms % day) / hour);
      // Remaining minutes
      const minutes = Math.floor(((ms % day) % hour) / minute);
      // Remaining seconds
      const seconds = Math.floor((((ms % day) % hour) % minute) / second);

      return { days, hours, minutes, seconds };
    }
    console.log(convertMs(result));

    elements.days.textContent = addLeadingZero(convertMs(result).days);
    elements.hours.textContent = addLeadingZero(convertMs(result).hours);
    elements.minutes.textContent = addLeadingZero(convertMs(result).minutes);
    elements.seconds.textContent = addLeadingZero(convertMs(result).seconds);

    setTimeout(() => clearInterval(id), result);
  }, 1000);
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}
