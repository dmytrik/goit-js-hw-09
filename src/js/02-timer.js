import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min.css';

const refs = {
  dateTime: document.querySelector('#datetime-picker'),
  start: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
  selectedDate: null,
  currentDate: null,
  intervalId: null,
};
const { dateTime, start, days, hours, minutes, seconds } = refs;
let { selectedDate, currentDate, intervalId } = refs;
start.disabled = true;

class Timer {
  constructor(selectedDate) {
    this.selectedDate = selectedDate;
  }

  go() {
    if (
      days.textContent !== '00' ||
      hours.textContent !== '00' ||
      minutes.textContent !== '00' ||
      seconds.textContent !== '00'
    ) {
      clearInterval(intervalId);
      intervalId = setInterval(this.timerGo, 1000, this.selectedDate);
      return;
    }
    intervalId = setInterval(this.timerGo.bind(this), 1000, this.selectedDate);
  }

  timerGo(selectedDate) {
    const currentDate = Date.now();
    const time = this.convertMs(selectedDate - currentDate);
    this.updateUI(time);
    this.checkUI();
  }

  updateUI(time) {
    days.textContent = this.addLeadingZero(time.days);
    hours.textContent = this.addLeadingZero(time.hours);
    minutes.textContent = this.addLeadingZero(time.minutes);
    seconds.textContent = this.addLeadingZero(time.seconds);
  }

  convertMs(ms) {
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

  checkUI() {
    if (
      days.textContent === '00' &&
      hours.textContent === '00' &&
      minutes.textContent === '00' &&
      seconds.textContent === '00'
    ) {
      clearInterval(intervalId);
      Notiflix.Notify.success('ЧАС ВИЙШОВ');
    }
  }

  addLeadingZero(value) {
    return String(value).padStart(2, '0');
  }
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates[0].getTime();
    currentDate = Date.now();
    checkDate(currentDate, selectedDate);
  },
};
flatpickr(dateTime, options);

function checkDate(currentDate, selectedDate) {
  if (currentDate > selectedDate) {
    Notiflix.Notify.failure('Please choose a date in the future');
    start.disabled = true;
    return;
  }
  start.disabled = false;
  const timer = new Timer(selectedDate);
  start.addEventListener('click', timer.go.bind(timer));
}

// start.addEventListener('click', startTimer);

// function startTimer() {
//   if (
//     days.textContent !== '00' ||
//     hours.textContent !== '00' ||
//     minutes.textContent !== '00' ||
//     seconds.textContent !== '00'
//   ) {
//     clearInterval(intervalId);
//     intervalId = setInterval(timerGo, 1000, selectedDate);
//     return;
//   }
//   intervalId = setInterval(timerGo, 1000, selectedDate);
// }

// function timerGo(selectedDate) {
//   const currentDate = Date.now();
//   const time = convertMs(selectedDate - currentDate);
//   updateUI(time);
//   checkUI();
// }

// function convertMs(ms) {
//   // Number of milliseconds per unit of time
//   const second = 1000;
//   const minute = second * 60;
//   const hour = minute * 60;
//   const day = hour * 24;

//   // Remaining days
//   const days = Math.floor(ms / day);
//   // Remaining hours
//   const hours = Math.floor((ms % day) / hour);
//   // Remaining minutes
//   const minutes = Math.floor(((ms % day) % hour) / minute);
//   // Remaining seconds
//   const seconds = Math.floor((((ms % day) % hour) % minute) / second);

//   return { days, hours, minutes, seconds };
// }

// function updateUI(time) {
//   days.textContent = addLeadingZero(time.days);
//   hours.textContent = addLeadingZero(time.hours);
//   minutes.textContent = addLeadingZero(time.minutes);
//   seconds.textContent = addLeadingZero(time.seconds);
// }
// function checkUI() {
//   if (
//     days.textContent === '00' &&
//     hours.textContent === '00' &&
//     minutes.textContent === '00' &&
//     seconds.textContent === '00'
//   ) {
//     clearInterval(intervalId);
//     Notiflix.Notify.success('ЧАС ВИЙШОВ');
//   }
// }

// function addLeadingZero(value) {
//   return String(value).padStart(2, '0');
// }
