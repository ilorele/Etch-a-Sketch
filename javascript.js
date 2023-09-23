const gridContainerEl = document.querySelector(".grid-container");
const gridSizeBtn = document.querySelector(".grid-size-btn");
let gridSize = 10;

const randomColorBtnEl = document.querySelector(".random-color-btn");
const shadingBtnEl = document.querySelector(".shading-btn");
const eraserBtnEl = document.querySelector(".eraser-btn");
const clearBtnEl = document.querySelector(".clear-btn");
const gridLinesToggleBtnEl = document.querySelector(".grid-toggle-btn");

let randomColorSwitch = false;
let shadingSwitch = false;
let eraser = false;
let gridLines = true;

const initialGrid = createInitialGrid();

function createInitialGrid() {
    createGrid(gridSize);
    const gridArr = nodelistToArr();
    showGrid(gridArr);
}


function getGridSize() {
    gridSize = Number(prompt("Set grid size"));

    if (gridSize === 0) {
        alert("Cancelled");
        return;
    } else if (isNaN(gridSize)) {
        alert("Please enter a number!");
        getGridSize();
    }

    if (gridSize < 0 || gridSize > 100) {
        alert("Grid size must be between 1 and 100!")
        getGridSize();
    } else {
        removePreviousGrid();
        return gridSize;
    }
}

function createGrid(gridSize) {
    for (let i = 0; i < gridSize * gridSize; i++) {
        createGridSquare();
    }
}

function createGridSquare() {
    const gridSingleSquare = document.createElement("div");
    gridSingleSquare.classList.add("grid-square");
    gridSingleSquare.style.flexBasis = 100 / gridSize + "%";

    if (gridLines) {
        gridSingleSquare.style.border = "1px solid black";
    }
    
    gridContainerEl.appendChild(gridSingleSquare);
}

function removePreviousGrid() {
    gridContainerEl.innerHTML = "";
}

function getRandomColor() {
    const color = [];

    for (let i = 0; i < 3; i++) {
        color.push(Math.floor((Math.random()) * 256));
    }

    return "rgb(" + color.join(", ") + ")";
}

function nodelistToArr() {
    const grid = gridContainerEl.querySelectorAll(".grid-square");
    const gridArr = Array.from(grid);

    return gridArr;
}

function showGrid(gridArr) {
    gridArr.forEach(element => {
        element.style.border = "1px solid black";
        gridLines = true;
    });
}

function hideGrid(gridArr) {
    gridArr.forEach(element => {
        element.style.border = "none";
        gridLines = false;
    });
}

function addClickedBtnEffect(btn) {
    btn.classList.add("btn-clicked");
}

function removeClickedBtnEffect(btn) {
    btn.classList.remove("btn-clicked");
}



gridSizeBtn.addEventListener("click", function() {
    createGrid(getGridSize());
});

gridContainerEl.addEventListener("mouseover", function(event) {
    if (randomColorSwitch) {
        event.target.style.backgroundColor = getRandomColor();
    } else if (eraser) {
        event.target.style.backgroundColor = "hsl(0, 0%, 100%)";
    } else if (shadingSwitch) {
        event.target.style.backgroundColor = "hsl(0, 0%, 80%)";
    } else {
        event.target.style.backgroundColor = "black";
    }
})

shadingBtnEl.addEventListener("click", function() {
    shadingSwitch = true;
    randomColorSwitch = false;
    eraser = false;
    addClickedBtnEffect(shadingBtnEl);
    removeClickedBtnEffect(randomColorBtnEl);
    removeClickedBtnEffect(eraserBtnEl);

})

randomColorBtnEl.addEventListener("click", function() {
    shadingSwitch = false;
    randomColorSwitch = true;
    eraser = false;
    addClickedBtnEffect(randomColorBtnEl);
    removeClickedBtnEffect(shadingBtnEl);
    removeClickedBtnEffect(eraserBtnEl);

})

eraserBtnEl.addEventListener("click", function() {
    shadingSwitch = false;
    randomColorSwitch = false;
    eraser = true;
    addClickedBtnEffect(eraserBtnEl);
    removeClickedBtnEffect(shadingBtnEl);
    removeClickedBtnEffect(shadingBtnEl);
})

clearBtnEl.addEventListener("click", function() {
    const gridArr = nodelistToArr();

    gridArr.forEach(element => {
        element.style.backgroundColor = "white";
    });
})

gridLinesToggleBtnEl.addEventListener("click", function() {
    const gridArr = nodelistToArr();

    if (gridLines) {
        hideGrid(gridArr);
        gridLinesToggleBtnEl.textContent = "Grid lines on";
    } else {
        showGrid(gridArr);
        gridLinesToggleBtnEl.textContent = "Grid lines off";

    }

})