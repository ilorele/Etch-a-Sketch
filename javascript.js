const gridContainerEl = document.querySelector(".grid-container");
const gridSizeBtn = document.querySelector(".grid-size-btn");
let gridSize = 10;
let pickedColor = "#C75CB3";

const pickedColorEl = document.querySelector(".picked-color");
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
        return;
    }

    if (gridSize < 0 || gridSize > 100) {
        alert("Grid size must be between 1 and 100!")
        getGridSize();
        return;
    } else {
        removePreviousGrid();
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

function getBackgroundColor(e) {
    const colorString = e.target.style.backgroundColor;

    const redSeparator = colorString.indexOf(",");
    const red = Number(colorString.slice(4,redSeparator));

    const greenSeparator = colorString.indexOf(",", redSeparator+1);
    const green = Number(colorString.slice(redSeparator + 2, greenSeparator));

    const blue = Number(colorString.slice(greenSeparator + 2, -1));

    const colorArr = [red, green, blue];

    return colorArr;
    
}

function RGBToHex(ArrInRGB) {
    const r = ArrInRGB[0] / 255;
    const g = ArrInRGB[1] / 255;
    const b = ArrInRGB[2] / 255;
    
    let cmin = Math.min(r,g,b),
    cmax = Math.max(r,g,b),
    delta = cmax - cmin,
    h = 0,
    s = 0,
    l = 0;

    if (delta == 0)
    h = 0;
    // Red is max
    else if (cmax == r)
    h = ((g - b) / delta) % 6;
    // Green is max
    else if (cmax == g)
    h = (b - r) / delta + 2;
    // Blue is max
    else
    h = (r - g) / delta + 4;

    h = Math.round(h * 60);
    
    // Make negative hues positive behind 360°
    if (h < 0)
      h += 360;

    // Calculate lightness
    // l = (((cmax + cmin) / 2) - 0.1).toFixed(1);
    l = ((cmax + cmin) / 2).toFixed(1);

    // Calculate saturation
    s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
    
    // Multiply l and s by 100
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);

    // const colorInHSL = "hsl(" + h + "," + s + "%," + l + "%)";
    const colorInHSLArr = [h,s,l]

    return colorInHSLArr;
}

function darkenColorHSL(colorHSLArr) {
    h = colorHSLArr[0];
    s = colorHSLArr[1];
    l = colorHSLArr[2] - 10;
    const newColor = "hsl(" + h + "," + s + "%," + l + "%)";

    return newColor;
}

function darkenColor(currentColorRGBArr) {
    const currentColorHSLArr = RGBToHex(currentColorRGBArr);
    const newColorHSLString = darkenColorHSL(currentColorHSLArr);

    return newColorHSLString;
}


gridSizeBtn.addEventListener("click", function() {
    getGridSize();
    createGrid(gridSize);
});

gridContainerEl.addEventListener("mouseover", function(event) {
    if (randomColorSwitch) {
        event.target.style.backgroundColor = getRandomColor();
    } else if (eraser) {
        event.target.style.backgroundColor = "hsl(0, 0%, 100%)";
    } else if (shadingSwitch) {
        if (event.target.style.backgroundColor === "" ||
            event.target.style.backgroundColor === "white"
        ) {
            event.target.style.backgroundColor = "rgb(255, 255, 255)";
        }
        const currentColorArr = getBackgroundColor(event);
        event.target.style.backgroundColor = darkenColor(currentColorArr);
    } else {
        event.target.style.backgroundColor = pickedColor;
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
    removeClickedBtnEffect(randomColorBtnEl);
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

pickedColorEl.addEventListener("change", function() {
    shadingSwitch = false;
    randomColorSwitch = false;
    eraser = false;
    removeClickedBtnEffect(eraserBtnEl);
    removeClickedBtnEffect(randomColorBtnEl);
    removeClickedBtnEffect(shadingBtnEl);
    pickedColor = pickedColorEl.value;
})