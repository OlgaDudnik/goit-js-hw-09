import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');
const delayMsEl = form.querySelector('[name="delay"]');
const stepMsEl = form.querySelector('[name="step"]');
const amountEl = form.querySelector('[name="amount"]');

form.addEventListener('submit', submitForm);

function submitForm(e) {
  e.preventDefault();
  let delay = Number(delayMsEl.value);
  let step = Number(stepMsEl.value);
  let amount = Number(amountEl.value);

  console.log(delay, step, amount);

  for (let i = 1; i <= amount; i += 1) {
    console.log(i);
    createPromise(i, delay)
      .then(({ position, delay }) => {
        console.log('then', position, delay);
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        console.log('catch', position, delay);
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    delay += step;
  }
  form.reset();
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
