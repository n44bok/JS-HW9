import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  delay: document.querySelector('input[name="delay"]'),
  step: document.querySelector('input[name="step"]'),
  amount: document.querySelector('input[name="amount"]'),
  form: document.querySelector('.form'),
}

refs.form.addEventListener('submit', onFormSubmit);

function onFormSubmit(evt) {
  evt.preventDefault();
  const data = {
    delay: parseInt(refs.delay.value),
    step: parseInt(refs.step.value),
    amount: parseInt(refs.amount.value),
  };
  callPromiseCreation(data);
};

function callPromiseCreation({delay, step, amount}) {
  let calculatedDelay = delay;

  for (let index = 1; index <= amount; index+=1) {
    createPromise(index, calculatedDelay).then(({ position, delay }) => {
      alert(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
      .catch(({ position, delay }) => {
        alert(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    calculatedDelay += step;
    
  }
};

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position: position, delay: delay });
      } else {
        reject({ position: position, delay: delay });
      }
    }, delay);
  });
}