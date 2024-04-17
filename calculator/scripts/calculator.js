const calculator = document.getElementById('calculator');
const display1 = document.getElementById('result');
const display2 = document.getElementById('operations');

// console.log('calculator=' + calculator);

// console.log('display=' + display);

let result = 0;  // final result of calculator
let acc = 0;  // accumulator for calculator
let cur = 0;  // current value being entered
let lastAction = null  // action

// update time
setInterval(currentTime, 1000);

function handleCalculator(key) {
    let action = key;
    let asNumber = Number(key);
    console.log(`dataBefore: result=${result}, acc=${acc}, cur=${cur}, lastAction=${lastAction}, curAction=${action}`);

    if (!isNaN(asNumber)) {
        console.log(`Read the number : ${asNumber}`);
        cur*=10;
        cur+=asNumber;
        result = cur;
    } else {
        if (lastAction == null) {
            lastAction = action;
            acc = result;
            cur = 0;
            result = cur;
        } else {
            switch (lastAction) {
                case 'add':
                case '+':
                    acc += cur;
                    break;
                case 'subtract':
                case '-':
                    acc -= cur;
                    break;
                case 'divide' :
                case '/' :
                    if(cur==0) {
                        result = "Error!";
                    } else {
                        acc /= cur;
                    }
                    break;
                case 'mult' :
                case '*' :
                    acc *= cur;
                    break;
                case 'equals' :
                case '=' :
                case 'Enter' :
                    result = acc;
                    cur = acc;
                    break;
                case 'clear' :
                case 'Escape' :
                    result = 0;
                    acc = 0;
                    cur = 0;
                    lastAction = null;
                    break;
                case 'clear-entry' :
                case 'Backspace' :
                    cur = 0;
                    result = 0;
                    lastAction = null;
                    break;
                default:
                    console.log('Error!');
                    result = "Error!";
            }
            if (action=='clear' || action=='Escape') {
                result = 0;
                acc = 0;
                cur = 0;
                lastAction = null;
            } else if (action=='clear-entry' || action=='Backspace') {
                cur = 0;
                result = 0;
                lastAction = null;
            } else if (action!='equals' && action!='=' && action!='Enter') {
                lastAction = action;
                result = 0;
                cur = 0;
            } else {
                console.log(`result=${result}, acc=${acc}`);
                result = acc;
            }
        }
    }

    console.log(`dataAfter: result=${result}, acc=${acc}, cur=${cur}, lastAction=${lastAction}, curAction=${action}`);
    // Update the display
    display1.textContent = "" + result;
    display2.textContent = "" + acc;
}

calculator.addEventListener('click', (event) => {
    if (event.target.matches('button')) {
        const key = event.target; // where we clicked
        const action = key.id; // what action to perform
        console.log(`The button ${action} was clicked.`);
        handleCalculator(action);
    }
});

document.addEventListener('keyup', (event) => {
    const releasedKey = event.key;
    console.log(`The key "${releasedKey}" was released.`);
    handleCalculator(event.key);
});

function currentTime() {
    const clock = document.getElementById("time");
    const time = new Date();
    const hour = formatTimeUnit(time.getHours());
    const min = formatTimeUnit(time.getMinutes());
    const sec = formatTimeUnit(time.getSeconds());
    const formattedTime = `${hour}:${min}:${sec}`;
    clock.textContent = formattedTime;
}

// Add leading zero if the value is less than 10
function formatTimeUnit(unit) {
    return unit < 10 ? `0${unit}` : unit;
}

function randomColors() {
    const enabled = document.querySelectorAll(".enabled");

    enabled.forEach((element) => {
        const randomColor = getRandomColor();
        const contrastColor = getContrastColor(randomColor);

        element.style.backgroundColor = randomColor;
        element.style.color = contrastColor;
    });

    const numbers = document.querySelectorAll(".numbers");
    const randomColor = getRandomColor();
    const contrastColor = getContrastColor(randomColor);

    numbers.forEach((element) => {
        element.style.backgroundColor = randomColor;
        element.style.color = contrastColor;
    });

}

// Generate a random color (hex format)
function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Determine a contrasting text color (black or white) based on the background color
function getContrastColor(hexColor) {
    const r = parseInt(hexColor.slice(1, 3), 16);
    const g = parseInt(hexColor.slice(3, 5), 16);
    const b = parseInt(hexColor.slice(5, 7), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;

    return brightness > 128 ? "#000000" : "#ffffff";
}

function toggleColors() {
    const swap = document.querySelectorAll("#swap, body");
    swap.forEach((element) => {
        if (element.className === "off") {
            element.className = "on";
            if (element.id === "swap") {
                element.textContent = "Darker Mode!";
            }
        } else if (element.className === "on") {
            if (element.id === "body") {
                element.className = "";
            } else {
                element.className = "off";
                if (element.id === "swap") {
                    element.textContent = "Lighter Mode!";
                }
            }
        } else {
            element.className = "on";
        }
    })

    // const allElements = document.querySelectorAll("*");

    // allElements.forEach((element) => {
    //     const bgColor = swapBackground(element.style.backgroundColor, swap.className);
    //     const contrastColor = getContrastColor(bgColor);

    //     element.style.backgroundColor = bgColor;
    //     element.style.color = contrastColor;
    // });
}

function swapBackground(color, mode) {
    // Modify the color depending on the mode
    // If mode == "off", offset the color to be darker
    // If mode == "on", offset the color to be lighter

    if (mode === "off") {
        return adjustColor(color, 0.8);
    } else if (mode === "on") {
        return adjustColor(color, 1.2);
    }

    // Default: Return the original color
    return color;
}

// Modify a color by a specified factor
function adjustColor(color, factor) {
    console.log(`hexcolor:${color}`);
    // Parse the color (assuming it's in hex format)
    const hexColor = color.replace("#", "");
    const r = parseInt(hexColor.slice(0, 2), 16);
    const g = parseInt(hexColor.slice(2, 4), 16);
    const b = parseInt(hexColor.slice(4, 6), 16);

    var newR, newG, newB;

    // Calculate the new RGB values
    if (factor > 1) {
        newR = Math.min(255, Math.floor(r * factor));
        newG = Math.min(255, Math.floor(g * factor));
        newB = Math.min(255, Math.floor(b * factor));
    } else {
        newR = Math.max(0, Math.floor(r * factor));
        newG = Math.max(0, Math.floor(g * factor));
        newB = Math.max(0, Math.floor(b * factor));
    }
    console.log(`#${newR.toString(16)}${newG.toString(16)}${newB.toString(16)}`);
    // Convert back to hex format
    return `#${newR.toString(16)}${newG.toString(16)}${newB.toString(16)}`;
}

