
class Projectile extends Hazard {
    constructor() {
        super();
    }
}

// definitions for the Bullet class
class Bullet extends Projectile {
    constructor(x, y, v1) {
        super();
        this.position = new Vector(random(20)+x-10, y);
        this.velocity = v1;
        this.xdir = (v1.x>0) ? 1 : -1;
        this.size = new Vector(10, 10);
        this.r = 5;
    }

    move() {
        this.velocity.y = -7.5 * speed * state;
        if (this.velocity.x = 0) {
            this.velocity.x = this.xdir * 7.5 * speed * state;
        }
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
