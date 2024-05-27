
// definitions for the spaceship class
class Spaceship extends Sprite {
    constructor() {
        // Call the parent Sprite constructor
        // super(width / 2, height - 40, 20, 20); // x, y, width, height
        super();
        this.x = width / 2;
        this.y = height - 40;
        this.width = 20;
        this.height = 20;
        this.r = 10;
        this.xdir = 0; // Initial horizontal direction (no movement)
        this.lives = 3;
    }

    // dir is a number either -1 (left) or 1 (right)
    setDir(dir) {
        this.xdir = dir;
    }

    move() {
        // Update the position based on direction and speed
        this.x += this.xdir * 5;
    }

    show() {
        // Display the spaceship
        fill(255); // Set color to white
        noStroke(); // No border
        rectMode(CENTER); // Draw from the center
        rect(this.x, this.y, this.width, this.height); // Draw the spaceship
    }
}
