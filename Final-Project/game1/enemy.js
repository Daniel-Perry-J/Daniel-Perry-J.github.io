let DEFAULT = 0;  // Red
let EASY = 1;     // Yellow
let MEDIUM = 2;   // Blue
let HARD = 3;     // Green
let DIFFICULT = 4;// Orange
let BOSS = 5;     // Purple


// definition for the Enemy Class
class Enemy extends Sprite {
    constructor(difficulty) {
        super();
        this.difficulty = random(difficulty-Math.floor(difficulty/10)) + difficulty/10;
        this.lives = Math.floor(this.difficulty/5);
        this.position = new Vector(random(width-this.r) + this.r, 0);
        this.initial_velocity = new Vector(0, random(5) + 1);
        this.velocity = new Vector(this.initial_velocity.x, this.initial_velocity.y);
        this.size = new Vector(15, 15);
        this.r = Math.max(this.size.x, this.size.y);
    }

    move() {
        this.velocity.y = this.initial_velocity.y * speed * state;
        if (state == GAME) {
            addVector(this.position, this.velocity);
        }
    }

    show() {
        switch (Math.floor(this.difficulty/5)) {
            case DEFAULT:
                fill(255, 0, 0);
                break;
            case EASY:
                fill(255, 255, 0);
                break;
            case MEDIUM:
                fill(0, 0, 255);
                break;
            case HARD:
                fill(0, 255, 0);
                break;
            case DIFFICULT:
                fill(255, 117, 49);
                break;
            case BOSS:
                fill(255, 0, 255);
                break;
            default:
                fill(255, 75, 75);
                break;
        }
        ellipse(this.position.x, this.position.y, this.r * 2);
    }

    // Later this should be in hazards
    hits(spaceship) {
        let d = dist
        (this.position.x, this.position.y, spaceship.position.x, spaceship.position.y);
        return (d < this.r + spaceship.r);
    }
}
