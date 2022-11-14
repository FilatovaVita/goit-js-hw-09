import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  promBtn: document.querySelector(`button`),
  form: document.querySelector(`.form`)

};

refs.promBtn.addEventListener(`click`, onCreatePromis);

function onCreatePromis (event){
  event.preventDefault();
  const formData = new FormData(refs.form)
  const inputs = Object.fromEntries(formData.entries())
  
  for (let i = 0; i <= inputs.amount - 1; i++) {
    const {step, delay} = inputs;

    createPromise(i + 1, i === 0 ? +delay : +delay + (+step * i))
      .then((data) => Notify.success(data))
      .catch((error) => Notify.failure(error))

    refs.form.reset();
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
      }, delay);
    })
  } else {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(`❌ Rejected promise ${position} in ${delay}ms`);
      }, delay);
    })
  }
}
