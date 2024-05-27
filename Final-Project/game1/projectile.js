
class Projectile extends Hazard {
    constructor() {
        super();
    }
}

// definitions for the Bullet class
class Bullet extends Projectile {
    constructor(x, y) {
        super();
        this.x = x;
        this.y = y;
        this.height = 16;
        this.r = 8;
    }

    move() {
        this.y -= 5;
    }

    show() {
        fill(50, 150, 255);
        ellipse(this.x, this.y, this.r * 2);
    }

    // Later this should be in hazards
    hits(enemy) {
        let d = dist(this.x, this.y, enemy.x, enemy.y);
        return (d < this.r + enemy.r);
    }
}
