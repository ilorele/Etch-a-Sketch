const gridContainerEl = document.querySelector(".grid-container");
const gridEl = createGrid(16);

function createGrid(gridSize) {
    for (let i = 0; i < gridSize * gridSize; i++) {
        createGridSquare();
    }
}

function createGridSquare() {
    const gridSingleSquare = document.createElement("div");
    gridSingleSquare.classList.add("grid-square");
    gridContainerEl.appendChild(gridSingleSquare);
}