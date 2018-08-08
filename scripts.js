const controls = document.querySelector('.controls');
const grid = document.querySelector('.display');
const ctrlBtns = controls.querySelectorAll('.ctrl-btn');
const width = grid.offsetWidth;
let write = true;
let mode = "black";

function handleGridClick(e) {
  if (e.target.classList.contains("cube")) write = !write;
}

window.addEventListener('click', handleGridClick);

function handleClick(e) {
  const selection = e.target.dataset.fun;
  const size = window.prompt('Please enter a grid size:', 16);

  switch (selection) {
    case "0":
      mode = "black";
      break;
    case "1":
      mode = "color";
      break;
    case "2":
      mode = "draw"
      break;
  }
  isNaN(size) ? generateGrid() : generateGrid(parseInt(size));
}

ctrlBtns.forEach(b => {
  b.addEventListener('click', handleClick);
})

function generateGrid(x=16) {
  const div = document.createElement('div');
  div.classList.add('cube')

  while (grid.firstChild) {
    grid.removeChild(grid.firstChild);
  }

  for (let i = 0; i < x**2; i++) {
    grid.appendChild(div.cloneNode());
  }

  grid.style.gridTemplate = `repeat(${x}, 1fr) / repeat(${x}, 1fr) `;
  generateListeners();
}

function generateListeners() {
  cubes = grid.querySelectorAll('.cube');

  cubes.forEach(c => {
    c.addEventListener('mouseenter', handleMouseEnter);
  })
}

function generateColor() {
  let hue = Math.floor(Math.random()*360);
  let sat = Math.floor(Math.random()*101);
  let ltn = Math.floor(Math.random()*81);
  return `hsla(${hue}, ${sat}%, ${ltn}%, 1)`
}

function getNewColor(oldColor) {
  if (!oldColor) return 'rgb(225, 225, 225)';
  if (oldColor === 'rgb(0, 0, 0)') return oldColor;
  const oldNum = oldColor.split(', ')[1];
  const newNum = oldNum - 25;
  return `rgb(${newNum}, ${newNum}, ${newNum})`
}

function handleMouseEnter(e) {
  if (!write) return;
  switch (mode) {
    case "black":
      e.target.style.backgroundColor = "black";
      break;
    case "color":
      e.target.style.backgroundColor = generateColor();
      break;
    case "draw":
      let newColor = getNewColor(e.target.style.backgroundColor);
      e.target.style.backgroundColor = newColor;
      break;
  }
}

generateGrid(8);
