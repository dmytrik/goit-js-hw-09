import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min.css';

const form = document.querySelector('.form');
const delay = form.elements.delay;
const step = form.elements.step;
const amount = form.elements.amount;

form.addEventListener('submit', generetePromises);

function generetePromises(event) {
  event.preventDefault();
  const countAmount = Number(amount.value);
  const countStep = Number(step.value);
  let countDelay = Number(delay.value);
  // let numberPromise = 1;

  for (let i = 1; i <= countAmount; i += 1) {
    createPromise(i, countDelay).then(resolve).catch(reject);
    countDelay += countStep;
  }

  // const id = setInterval(() => {
  //   createPromise(numberPromise, countDelay).then(resolve).catch(reject);
  //   countDelay += countStep;
  //   numberPromise === countAmount ? clearInterval(id) : false;
  //   numberPromise += 1;
  // }, countDelay);
}
function resolve(result) {
  Notiflix.Notify.success(result);
}
function reject(result) {
  Notiflix.Notify.failure(result);
}
function createPromise(position, delay) {
  return (promise = new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    // shouldResolve
    //   ? resolve(`✅ Fulfilled promise ${position} in ${delay} ms`)
    //   : reject(`❌ Rejected promise ${position} in ${delay} ms`);
    setTimeout(() => {
      shouldResolve
        ? resolve(`✅ Fulfilled promise ${position} in ${delay} ms`)
        : reject(`❌ Rejected promise ${position} in ${delay} ms`);
    }, delay);
  }));
}
