const controls = document.querySelector('.controls');
const grid = document.querySelector('.display');
const ctrlBtns = controls.querySelectorAll('.ctrl-btn');
const width = grid.offsetWidth;

function handleClick(e) {
  console.log(e.target.dataset.fun);
}

ctrlBtns.forEach(b => {
  b.addEventListener('click', handleClick);
})

function generateGrid(x=16) {
  const div = document.createElement('div');
  div.classList.add('cube')

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

function handleMouseEnter(e) {
  e.target.style.backgroundColor = "black";
}

generateGrid();
