
// display
class Display {
    constructor(text, x, y, textsize) {
        this.text = text;
        this.position = new Vector(x, y);
        this.textsize = textsize;
    }

    show() {
        fill(255);
        textSize(this.textsize);
        text(this.text, this.position.x, this.position.y);
    }
    
}

let xoffset = 150;

function displayGameover() {
    gameoverDisplay = new Display("Game Over!", width/2 - 100, height/2, 100);
    gameoverDisplay.show();
    otherDisplay = new Display("Touch the screen, Click the mouse, or Press any key to play again", width/3, height*3/4, 25);
    otherDisplay.show();
}

function displayScore() {
    if (score >= highscore) {
        highscore = score;
    }
    scoreDisplay = new Display("Score : " + nZeros(score, 8) + "\nHighScore : " + highscore, width - xoffset, height/6 - 50, 15);
    scoreDisplay.show();
}

function displayTime() {
    timeDisplay = new Display("" + nZeros(Math.floor(time/60), 2) + ":" + nZeros(time%60, 2), width - xoffset, height/6 - 80, 15);
    timeDisplay.show();
}

function displayLives() {
    lifeDisplay = new Display("Lives : " + nZeros(spaceship.lives, 4), width - xoffset, height/6 - 100, 15);
    lifeDisplay.show();
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
    let offset = Math.floor(Math.log10(str));
    if (n-offset > 0) {
        return "0".repeat(n-offset) + str;
    }
    return str;
}
