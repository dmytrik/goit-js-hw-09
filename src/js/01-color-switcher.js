const refs = {
  start: document.querySelector('[data-start]'),
  stop: document.querySelector('[data-stop]'),
  id: null,
};

refs.start.addEventListener('click', colorSwitcher);
refs.stop.addEventListener('click', switcherStop);

function colorSwitcher() {
  refs.id = setInterval(changeColor, 1000);
  refs.start.disabled = true;
  refs.stop.disabled = false;
}
function changeColor() {
  document.body.style.backgroundColor = getRandomHexColor();
}
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
function switcherStop() {
  refs.stop.disabled = true;
  refs.start.disabled = false;
  clearInterval(refs.id);
}
