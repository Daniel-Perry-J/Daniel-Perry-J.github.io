let NONE = 0;
let SHIELD = 1;
let MORE_BULLETS = 2;
let HEAVY_IMPACT = 3;
let FLASH = 4;
let DOUBLE_MULTIPLIER = 5;
let INVINCIBLE = 6;

let customColor = [168, 181, 255];
let extraSpeed = 0;
let extraLives = 0;

class Powerup extends Sprite {
    constructor() {
        super();
        this.position = new Vector(random(width-20) + 10, 0);
        this.velocity = new Vector(random(5) + 1, random(5) + 1);
        this.effect = Math.floor(random(6)) + 1;
        this.color = [random(255), 100, 75];
    }

    show() {
        switch (this.effect) {
            case SHIELD:
                break;
            case MORE_BULLETS:
                break;
            case HEAVY_IMPACT:
                break;
            case FLASH:
                break;
            case DOUBLE_MULTIPLIER:
                break;
            case INVINCIBLE:
                break;
            default:
                fill(this.color[0], this.color[1], this.color[2]);
                break;
        }
        colorMode(HSB, 100);
        this.color[0] += 1;
        this.color[0] %= 255;
        rectMode(CENTER);
        rect(this.position.x, this.position.y, this.size.x, this.size.y);
    }
}

class Powers {
    constructor() {
        this.bullets = 0;
        this.spread = 0;
        this.speed = 0;
        this.fireRate = 0;
        this.shields = 0;
        this.blast_radius = 0;
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
        this.maxVelocity = 5 + extraSpeed;
        this.minAcceleration = 0.1 + extraSpeed * 0.1;
        this.maxAcceleration = 0.5 + extraSpeed * 0.1;
        this.r = 10;
        this.xdir = 0; // Initial horizontal direction (no movement)
        this.lives = 15 + extraLives;
        this.activePowers = new Powers();
    }

    // dir is a number either -1 (left) or 1 (right)
    setDir(dir) {
        this.xdir = dir;
    }

    move() {
        // Set accelerations
        if (Math.abs(this.acceleration.x) < this.maxAcceleration && Math.abs(this.xdir) > 0) {
            this.acceleration.x += this.minAcceleration * this.xdir;
        } else {
            this.acceleration.x = 0;
        }
        // compute velocity
        if (Math.abs(this.velocity.x) >= this.maxVelocity * speed) {
            // max velocity
            this.velocity.x = this.xdir * this.maxVelocity * speed;
        } else {
            // no acceleration slow down and stop movement
            if (this.acceleration.x == 0) {
                if (this.velocity.x > 0) {
                    this.velocity.x -= this.minAcceleration * speed;
                } else if (this.velocity.x < 0) {
                    this.velocity.x += this.minAcceleration * speed;
                }
            } else {
                // some acceleration increase velocity
                this.velocity.x += this.acceleration.x;
            }
        } 
        if (Math.abs(this.velocity.x) <= this.minAcceleration * speed + 0.0001) {
            // Fix floating point bugs
            this.velocity.x = 0;
        }
        addVector(this.position, this.velocity);
    }

    show() {
        // Display the spaceship
        fill(customColor[0], customColor[1], customColor[2], 0.1*255); // Set color to white
        noStroke(); // No border
        rectMode(CENTER); // Draw from the center
        rect(this.position.x, this.position.y, this.size.x, this.size.y); // Draw the spaceship
        fill(customColor[0], customColor[1], customColor[2], 0.4*255);
        rect(this.position.x, this.position.y, this.size.x-5, this.size.y-5);
        fill(customColor[0], customColor[1], customColor[2], 0.7*255);
        rect(this.position.x, this.position.y, this.size.x-10, this.size.y-10);
        fill(customColor[0], customColor[1], customColor[2], 255);
        rect(this.position.x, this.position.y, this.size.x-15, this.size.y-15);
    }
}
