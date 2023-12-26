const elements = {
  start: document.querySelector('button[data-start]'),
  stop: document.querySelector('button[data-stop]'),
  body: document.querySelector('body'),
};

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

elements.start.addEventListener('click', handlerStart);
elements.stop.addEventListener('click', handlerStop);

let id = null;

function handlerStart(evt) {
  evt.target.disabled = true;
  elements.stop.disabled = false;
  // elements.stop.removeAttribute('disabled');
  id = setInterval(() => {
    elements.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function handlerStop(evt) {
  evt.target.disabled = 'true';
  elements.start.disabled = false;
  // elements.start.removeAttribute('disabled');
  clearInterval(id);
}
