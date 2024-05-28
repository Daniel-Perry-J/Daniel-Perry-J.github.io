

// definition for the Enemy Class
class Enemy extends Sprite {
    constructor() {
        super();
        this.position = new Vector(random(width-this.r) + this.r, 0);
        this.velocity = new Vector(0, random(10*speed));
        this.size = new Vector(30, 30);
        this.r = Math.max(this.size.x, this.size.y);
    }

    move() {
        if (state == GAME) {
            this.position = this.position.add(this.velocity);
        }
    }

    show() {
        fill(255, 0, 0);
        ellipse(this.position.x, this.position.y, this.r * 2);
    }

    // Later this should be in hazards
    hits(spaceship) {
        let d = dist
        (this.position.x, this.position.y, spaceship.position.x, spaceship.position.y);
        return (d < this.r + spaceship.r);
    }
}