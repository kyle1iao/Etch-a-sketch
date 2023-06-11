// Global variables
const DEFAULT_SIZE = 16;

let currentColor = '#333333'


// DOM Selectors
const container = document.getElementById("grid");

function createGrid(size) {}

function makeRows(size = DEFAULT_SIZE) {
  container.style.setProperty("--grid-rows", size);
  container.style.setProperty("--grid-cols", size);
  for (c = 0; c < size * size; c++) {
    let cell = document.createElement("div");
    cell.classList.add("grid-item");
      cell.addEventListener('mouseover', changeColor);
      cell.addEventListener('mousedown', changeColor);
    container.appendChild(cell);
  }
}

let mouseDown = false;
document.body.addEventListener('mousedown', (e) => {
  mouseDown = true;
  e.preventDefault(); // Prevent default browser behavior
});
document.body.addEventListener('mouseup', () => (mouseDown = false));

function changeColor(e) {
  if (e.type === 'mouseover' && !mouseDown) return
  e.target.style.backgroundColor = currentColor;
}

window.onload = () => {
  makeRows(32);
}
