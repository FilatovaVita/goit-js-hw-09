import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
const refs = {
  startBtn: document.querySelector(`[data-start]`),
  dataInput: document.querySelector(`#datetime-picker`),
  days: document.querySelector(`[data-days]`),
  hours: document.querySelector(`[data-hours]`),
  minutes: document.querySelector(`[data-minutes]`),
  seconds: document.querySelector(`[data-seconds]`)
};
refs.startBtn.disabled = true;

let timeStart;
let idInterval;


function onStart() {
  idInterval = setInterval(() => {
    const deltaTime = timeStart.getTime() - new Date().getTime();

    if (deltaTime < 1000) {
      onStop();
    }

    const timeComponent = convertMs(deltaTime);
    updateClock(timeComponent);
  }, 1000);
};

function onStop() {
  clearInterval(idInterval)
}

refs.startBtn.addEventListener("click", function() {
  onStart();
  refs.startBtn.disabled = true;
})

flatpickr(refs.dataInput, {
  onClose(selectedDates) {
    const inputDate = selectedDates[0];
    
    if(inputDate.getTime() < new Date().getTime()) {
      Notify.failure('Please choose a date in the future');
    } else {
      timeStart = inputDate;
      refs.startBtn.disabled = false;
    }
}});


function convertMs(ms) {

  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value){ 
  return String(value).padStart(2, `0`);
};
function updateClock ({ days, hours, minutes, seconds }){
  refs.days.textContent = `${days}`;
  refs.hours.textContent = `${hours}`;
  refs.minutes.textContent = `${minutes}`;
  refs.seconds.textContent = `${seconds}`;
}