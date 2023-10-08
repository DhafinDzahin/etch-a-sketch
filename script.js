const canvas = document.getElementById('canvas');
const rangeBox = document.getElementById('range-box');
const rangeInput = document.getElementById('range-input');
const rangeSlider = document.getElementById('range-slider');
const sizeText = document.getElementById('size-text');
const leftMouseBox = document.getElementById('left-mouse-box');
const rightMouseBox = document.getElementById('right-mouse-box');
const leftColorInput = document.getElementById('left-color');
const rightColorInput = document.getElementById('right-color');
const randomColor = document.getElementById('random-color');
const eraser = document.getElementById('eraser');
const eraserIcon = document.getElementById('eraser-icon');
const borderWidth = 2;
let rightColor = document.getElementById('right-color').value;
let leftColor = document.getElementById('left-color').value;

// **************************************
// Grid Logic

function createDiv(size) {
    const grid = document.createElement('grid');
    grid.classList.add('grid');
    grid.style.width = `${size}px`;
    grid.style.height = `${size}px`;
    return grid;
}

function makeGrids(amount = 16) {
    canvas.innerHTML = '';
    const grid = createDiv(canvas.clientWidth / amount);
    for (let i = 0; i < amount * amount; i++) {
        canvas.appendChild(grid.cloneNode());
    }
}

function addGridListener() {
    const grids = document.getElementsByClassName('grid');

    [...grids].forEach(element => {
        element.addEventListener('mouseleave', (e) => {
            if (!isRandom()) {
                leftColor = leftColorInput.value;
                rightColor = rightColorInput.value;
            };
            if (eraserIcon.classList.contains('eraser-active'))
            {
                leftColor = '#cccccc';
                rightColor = '#cccccc';
            };
        if (e.buttons === 1) element.style.backgroundColor = leftColor;
        if (e.buttons === 2) element.style.backgroundColor = rightColor;
    });
    element.addEventListener('click', () => element.style.backgroundColor = leftColor);
    element.addEventListener('contextmenu', () => element.style.backgroundColor = rightColor);
});
}

// **************************************
// Grid Size Input

rangeSlider.addEventListener('change', () => {
    sizeText.textContent = `${rangeSlider.value}X${rangeSlider.value}`;
    makeGrids(rangeSlider.value);
    addGridListener();
});

rangeSlider.addEventListener('input', () => rangeInput.value = rangeSlider.value);

rangeInput.addEventListener('blur', () => {
    if (rangeInput.value < 1) rangeInput.value = 1;
    if (rangeInput.value > 100) rangeInput.value = 100;
    sizeText.textContent = `${rangeInput.value}X${rangeInput.value}`;
    makeGrids(rangeInput.value);
    rangeSlider.value = rangeInput.value;
    addGridListener();
});

// **************************************
// Random Color

function getRandomColor() {
    const r = Math.floor(Math.random() * 256); // Random value for red (0-255)
    const g = Math.floor(Math.random() * 256); // Random value for green (0-255)
    const b = Math.floor(Math.random() * 256); // Random value for blue (0-255)

    const color = `rgb(${r},${g},${b})`;
    return color;
}

function isRandom() {
    if (randomColor.classList.contains('random-color')) {
        leftColor = getRandomColor();
        rightColor = getRandomColor();
        return true;
    }
    return false;
}
// **************************************
// Option Box

leftMouseBox.addEventListener('click', () => leftColorInput.click());
leftColorInput.addEventListener('input', () => leftColor = leftColorInput.value);
rightMouseBox.addEventListener('click', () => rightColorInput.click());
rightColorInput.addEventListener('input', () => rightColor = rightColorInput.value);
eraser.addEventListener('click', () => {
    if (eraserIcon.classList.contains('eraser-active')) {
        eraserIcon.classList.remove('eraser-active');
        eraserIcon.classList.add('eraser-deactive');
    }
    else {
        eraserIcon.classList.remove('eraser-deactive');
        eraserIcon.classList.add('eraser-active');
    }
    randomColor.classList.remove('random-color');
});
randomColor.addEventListener('click', () => {
    randomColor.classList.toggle('random-color');
    if (eraserIcon.classList.contains('eraser-active')) {
        eraserIcon.classList.remove('eraser-active');
        eraserIcon.classList.add('eraser-deactive');
    }
});



makeGrids();
addGridListener();
