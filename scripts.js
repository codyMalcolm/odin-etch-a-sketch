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
      mode = "greys"
      break;
    case "3":
      mode = "darken"
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
  let r = Math.floor(Math.random()*256);
  let g = Math.floor(Math.random()*256);
  let b = Math.floor(Math.random()*256);
  return `rgb(${r}, ${g}, ${b})`
}

function getNewShade(oldShade) {
  if (!oldShade) return 'rgb(225, 225, 225)';
  if (oldShade === 'rgb(0, 0, 0)') return oldShade;
  const oldNum = oldShade.split(', ')[1];
  const newNum = oldNum - 25;
  return `rgb(${newNum}, ${newNum}, ${newNum})`
}

function getNewColor(cube) {
  let oldColor = cube.style.backgroundColor;
  if (oldColor === 'rgb(0, 0, 0)') return oldColor;
  if (!oldColor) {
    const color = generateColor();
    const arr = color.split(', ');
    cube.dataset.r = arr[0].slice(4) / 10;
    cube.dataset.g = arr[1] / 10;
    cube.dataset.b = arr[2].slice(0, -1) / 10;
    return color;
  }
  const arr = oldColor.split(', ');
  const r = arr[0].slice(4) - cube.dataset.r;
  const g = arr[1] - cube.dataset.g;
  const b = arr[2].slice(0, -1) - cube.dataset.b;
  return `rgb(${r}, ${g}, ${b})`;
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
    case "greys":
      let newShade = getNewShade(e.target.style.backgroundColor);
      e.target.style.backgroundColor = newShade;
      break;
    case "darken":
      let newColor = getNewColor(e.target);
      e.target.style.backgroundColor = newColor;
  }
}

generateGrid(16);
