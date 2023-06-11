// Global variables
const DEFAULT_SIZE = 16;
const DEFAULT_MODE = "color";

let currentColor = "#333333";
let currentMode = DEFAULT_MODE;
let currentSize = DEFAULT_SIZE;

// DOM Selectors
const container = document.getElementById("grid");
const buttons = document.querySelectorAll("button");
const rainbowBtn = document.getElementById("rainbowBtn");
const clearBtn = document.getElementById("clearBtn");
const eraserBtn = document.getElementById("eraserBtn");
const colorBtn = document.getElementById("colorBtn");
const checkbox = document.querySelector('.gridlinescb input[type="checkbox"]');
const colorPicker = document.getElementById("colorPicker");
const sizeSlider = document.getElementById('sizeSlider')
const sizeLabel = document.getElementById("sizeLabel");
let gridItems;

// Event listeners
colorPicker.oninput = (e) => {
  currentColor = e.target.value;
};

buttons.forEach((button) => {
  if (button.id !== "clearBtn") {
    button.addEventListener("click", () => {
      // Toggle the 'active' class on the clicked button
      button.classList.toggle("active");
    });
  }
});

let mouseDown = false;
container.addEventListener("mousedown", (e) => {
  mouseDown = true;
  e.preventDefault(); // Prevent default browser behavior
});
document.body.addEventListener("mouseup", () => (mouseDown = false));

sizeSlider.onmousemove = (e) => updateSizeValue(e.target.value)
sizeSlider.onchange = (e) => changeSize(e.target.value)

function changeSize(value) {
  setCurrentSize(value)
  updateSizeValue(value)
  clear()
}

function updateSizeValue(value) {
  sizeLabel.innerHTML = `${value} x ${value}`
}

function setCurrentSize(newSize) {
  currentSize = newSize
}

clearBtn.addEventListener("click", clear);
colorBtn.onclick = () => setCurrentMode("color");
rainbowBtn.onclick = () => setCurrentMode("rainbow");
eraserBtn.onclick = () => setCurrentMode("eraser");

checkbox.addEventListener("change", function () {
  if (checkbox.checked) {
    container.classList.add("gridlines-on");
  } else {
    container.classList.remove("gridlines-on");
  }
});

// Functions
function createGrid(size = DEFAULT_SIZE) {
  container.style.setProperty("--grid-rows", size);
  container.style.setProperty("--grid-cols", size);
  for (c = 0; c < size * size; c++) {
    let cell = document.createElement("div");
    cell.classList.add("grid-item");
    cell.addEventListener("mouseover", changeColor);
    cell.addEventListener("mousedown", changeColor);
    container.appendChild(cell);
  }
}

function changeColor(e) {
  if (e.type === "mouseover" && !mouseDown) return;

  switch (currentMode) {
    case "rainbow":
      const randomR = Math.floor(Math.random() * 256);
      const randomG = Math.floor(Math.random() * 256);
      const randomB = Math.floor(Math.random() * 256);
      e.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`;
      break;
    case "color":
      e.target.style.backgroundColor = currentColor;
      break;
    case "eraser":
      e.target.style.backgroundColor = "#fefefe";
      break;
    default:
      break;
  }
}

function clear() {
  container.innerHTML = "";
  createGrid(currentSize);
}

function activateButton(newMode) {
  if (currentMode === "rainbow") {
    rainbowBtn.classList.remove("active");
  } else if (currentMode === "color") {
    colorBtn.classList.remove("active");
  } else if (currentMode === "eraser") {
    eraserBtn.classList.remove("active");
  }

  if (newMode === "rainbow") {
    rainbowBtn.classList.add("active");
  } else if (newMode === "color") {
    colorBtn.classList.add("active");
  } else if (newMode === "eraser") {
    eraserBtn.classList.add("active");
  }
}

function setCurrentMode(newMode) {
  activateButton(newMode);
  currentMode = newMode;
}

window.onload = () => {
  createGrid(DEFAULT_SIZE);
  activateButton(DEFAULT_MODE);
};

console.log(sizeSlider)
