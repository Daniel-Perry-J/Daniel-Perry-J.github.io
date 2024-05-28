

// definition for the Enemy Class
class Enemy extends Sprite {
    constructor() {
        super();
        this.x = random(width);
        this.y = 0;
        this.height = 30;
        this.r = 15;
    }

    move() {
        this.y += 2*speed;
    }

    show() {
        fill(255, 0, 0);
        ellipse(this.x, this.y, this.r * 2);
    }

    // Later this should be in hazards
    hits(spaceship) {
        let d = dist(this.x, this.y, spaceship.x, spaceship.y);
        return (d < this.r + spaceship.r);
    }
}