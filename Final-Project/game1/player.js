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
        this.velocity = new Vector(0, 0);
        this.acceleration = new Vector(0, 0);
        this.maxVelocity = 5;
        this.minAcceleration = 0.1;
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
        if (this.xdir > 0) {
            this.acceleration.x = this.minAcceleration;
        } else if (this.xdir < 0) {
            this.acceleration.x = -this.minAcceleration;
        } else {
            this.acceleration.x = 0;
        }
        if (Math.abs(this.velocity.x) >= this.maxVelocity * speed) {
            this.velocity.x = this.xdir * this.maxVelocity * speed;
        } else {
            if (this.acceleration.x == 0) {
                if (this.velocity.x > 0) {
                    this.velocity.x -= this.minAcceleration * speed;
                } else if (this.velocity.x < 0) {
                    this.velocity.x += this.minAcceleration * speed;
                }
            } else {
                this.velocity.x += this.acceleration.x * speed * 5;
            }
        } 
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
