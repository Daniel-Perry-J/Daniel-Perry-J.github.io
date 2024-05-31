
class Projectile extends Hazard {
    constructor() {
        super();
    }
}

// definitions for the Bullet class
class Bullet extends Projectile {
    constructor(x, y) {
        super();
        this.position = new Vector(x, y);
        this.velocity = new Vector(0, -5 * speed);
        this.size = new Vector(16, 16);
        this.r = 8;
    }

    move() {
        this.velocity.y = -5 * speed * state;
        if (state == GAME) {
            addVector(this.position, this.velocity);
        }
    }

    show() {
        fill(50, 150, 255);
        ellipse(this.position.x, this.position.y, this.r * 2);
    }

    // Later this should be in hazards
    hits(enemy) {
        let d = dist(this.position.x, this.position.y, enemy.position.x, enemy.position.y);
        return (d < this.r + enemy.r);
    }
}
