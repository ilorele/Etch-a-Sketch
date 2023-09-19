const gridContainerEl = document.querySelector(".grid-container");
const gridSizeBtn = document.querySelector(".grid-size-btn");
let gridSize = 16;

function getGridSize() {
    gridSize = Number(prompt("Set grid size"));

    console.log(gridSize)

    if (gridSize === 0) {
        alert("Cancelled");
    } else if (isNaN(gridSize)) {
        alert("Please enter a number!");
        getGridSize();
    }

    if (gridSize < 0 || gridSize > 100) {
        alert("Grid size must be between 1 and 100!")
        getGridSize();
    } else {
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
    gridContainerEl.appendChild(gridSingleSquare);
}

function removePreviousGrid() {
    gridContainerEl.innerHTML = "";
}

gridSizeBtn.addEventListener("click", function() {
    removePreviousGrid();
    createGrid(getGridSize());
});