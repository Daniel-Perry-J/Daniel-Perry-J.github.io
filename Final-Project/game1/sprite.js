// Sprite class
class Sprite {
    constructor() {
        this.position = new Vector(0, 0);
        this.velocity = new Vector(0, 0);
        this.size = new Vector(0, 0);
        this.r = Math.max(this.size.x, this.size.y);
        this.img;
        this.animation_list;
    }
    show() {/* Override this method */}
    move() {
        throw new Error("Abstract function can not be called.")
    }
}
