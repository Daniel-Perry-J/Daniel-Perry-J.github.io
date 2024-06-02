let NONE = 0;
let SHIELD = 1;
let MORE_BULLETS = 2;
let HEAVY_IMPACT = 3;
let CLEAR = 4;
let DOUBLE_MULTIPLIER = 5;

class Powerup extends Sprite {
    constructor() {
        super();
        this.position = new Vector(random(width-20) + 10, 0);
        this.velocity = new Vector(random(5) + 1, random(5) + 1);
        this.effect = Math.floor(random(6));
    }
}




// definitions for the spaceship class
class Spaceship extends Sprite {
    constructor() {
        // Call the parent Sprite constructor
        // super(width / 2, height - 40, 20, 20); // x, y, width, height
        super();
        this.position = new Vector(width / 2, height - 40);
        this.size = new Vector(20, 20);
        this.r = 10;
        this.xdir = 0; // Initial horizontal direction (no movement)
        this.lives = 10;
        this.activePower = NONE;
    }

    // dir is a number either -1 (left) or 1 (right)
    setDir(dir) {
        this.xdir = dir;
    }

    move() {
        // Update the position based on direction and speed
        this.velocity.x = this.xdir * 5 * speed;
        addVector(this.position, this.velocity);
    }

    show() {
        // Display the spaceship
        fill(255); // Set color to white
        noStroke(); // No border
        rectMode(CENTER); // Draw from the center
        rect(this.position.x, this.position.y, this.size.x, this.size.y); // Draw the spaceship
    }
}
