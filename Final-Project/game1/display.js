
// display
class Display {
    constructor(text, x, y, size, horizontalAlign, verticalAlign) {
        this.text = text;
        this.position = new Vector(x, y);
        this.size = size;
        this.horizontalAlign = horizontalAlign;
        this.verticalAlign = verticalAlign;
    }

    show() {
        fill(255);
        textAlign(this.horizontalAlign, this.verticalAlign);
        textSize(this.size);
        text(this.text, this.position.x, this.position.y);
    }
    
}

let xoffset = 10;
let yoffset = 10;
let fontSize = 25;
function updateDisplays() {
    if (width < 400) {
        fontSize = 10;
    } else if (width < 600) {
        fontSize = 15;
    } else if (width < 800) {
        fontSize = 20;
    } else if (width < 1000) {
        fontSize = 25;
    }
}

function displayGameover() {
    gameoverDisplay = new Display("Game Over!\nTry again in " + timeout + "secs", width/2, height/4, fontSize*4, CENTER, CENTER);
    gameoverDisplay.show();
    displayBack2Menu();
}

function displayBack2Menu() {
    displayButtons(["Main Menu", "Try Again"], gameoverAction);
}

function gameoverAction(optionIndex) {
    timeout = 1;
    if (optionIndex == 0) {
        state = MENU;
    } else {
        state = GAME;
        restartGame();
    }
}

function displayScore() {
    if (score >= highscore) {
        highscore = score;
    }
    scoreDisplay = new Display("Score : " + nZeros(score, 8) + "\nHighScore : " + nZeros(highscore, 8), width - xoffset, height/6 - 50, fontSize, RIGHT, CENTER);
    scoreDisplay.show();
}

function displayTime() {
    timeDisplay = new Display("Time : " + nZeros(Math.floor(time/60), 2) + ":" + nZeros(time%60, 2), width - xoffset, 50, fontSize, RIGHT, CENTER);
    timeDisplay.show();
}

function displayLives() {
    lifeDisplay = new Display("Lives : " + nZeros(spaceship.lives, 2), width - xoffset, 25, fontSize, RIGHT, CENTER);
    lifeDisplay.show();
}

function displayCurrency() {
    currencyDisplay = new Display("Stardust : " + nZeros(stardust, 4) + "\nStarCores : " + nZeros(starcores, 2), 10, 10, fontSize, LEFT, TOP);
    currencyDisplay.show();
}

// function twoZeros(str) {
//     if (str / 10 < 1) {
//         return "0"+str;
//     }
//     return str;
// }

// function threeZeros(str) {
//     if (str / 10 < 1) {
//         return "00"+str;
//     } else if (str / 100 < 1) {
//         return "0"+str;
//     }
//     return str;
// }

function nZeros(str, n) {
    let offset = Math.floor(Math.log10(str)) + 1;
    if (n-offset > 0 && offset < n && offset != NaN && offset != Infinity && offset != -Infinity) {
        return ("0".repeat(n-offset)) + str;
    } else if (str == 0 || str === '0') {
        return ("0".repeat(n));
    }
    return str;
}
