import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const startBtn = document.querySelector('button[data-start]');
const daysSpan = document.querySelector('span.value[data-days]');
const hoursSpan = document.querySelector('span.value[data-hours]');
const minutesSpan = document.querySelector('span.value[data-minutes]');
const secondsSpan = document.querySelector('span.value[data-seconds]');

let timerId = null;
let dateDiffInMs = 0;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const curDate = new Date();
    const selectedDate = selectedDates[0];
    const isStartBtnHasAttrDisabled = startBtn.hasAttribute('disabled');

    if (curDate.getTime() > selectedDate.getTime()) {
      Notify.failure('Please choose a date in the future');
      if (!isStartBtnHasAttrDisabled) {
        startBtn.setAttribute('disabled', 'disabled');
      }
      return;
    }

    if (isStartBtnHasAttrDisabled) {
      startBtn.removeAttribute('disabled');
    }

    dateDiffInMs = selectedDate.getTime() - curDate.getTime();
  },
};

flatpickr('#datetime-picker', options);

function proceedTimer() {
  if (timerId) {
    return;
  }

  startBtn.setAttribute('disabled', 'disabled');

  timerId = setInterval(() => {
    renderTimer(convertMs(dateDiffInMs));
    dateDiffInMs -= 1000;
    if (dateDiffInMs <= 0) {
      clearInterval(timerId);
      Notify.info('Done');
    }
  }, 1000);
}

startBtn.addEventListener('click', proceedTimer);

function renderTimer({ days, hours, minutes, seconds }) {
  daysSpan.textContent = addLeadingZero(days);
  hoursSpan.textContent = addLeadingZero(hours);
  minutesSpan.textContent = addLeadingZero(minutes);
  secondsSpan.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

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
