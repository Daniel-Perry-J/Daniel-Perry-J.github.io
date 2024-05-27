
// display
class Display {
    constructor(text, x, y, size) {
        this.text = text;
        this.x = x;
        this.y = y;
        this.size = size;
    }

    show() {
        fill(255);
        textSize(this.size);
        text(this.text, this.x, this.y);
    }
    
}

function displayGameover() {
    gameoverDisplay = new Display("Game Over!", width/2 - 100, height/2, 100);
    gameoverDisplay.show();
    otherDisplay = new Display("Touch the screen, Click the mouse, or Press any key to play again", width/3, height*3/4, 25);
    otherDisplay.show();
}

function displayScore() {
    scoreDisplay = new Display("Score : " + score, width - 125, height/6 - 50, 15);
    scoreDisplay.show();
}

function displayTime() {
    timeDisplay = new Display("" + twoZeros(Math.floor(time/60)) + ":" + twoZeros(time%60), width - 125, height/5 - 50, 15);
    timeDisplay.show();
}

function twoZeros(str) {
    if (str / 10 < 1) {
        return "0"+str;
    }
    return str;
}
