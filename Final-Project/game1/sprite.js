// Sprite class
class Sprite {
    constructor() {
        this.x;
        this.y;
        this.r;
        this.dx;
        this.dy;
        this.height;
        this.width;
        this.img;
        this.animation_list;
    }
    show() {/* Override this method */}
    move() {
        // Default movement
        this.x += this.dx;
        this.y += this.dy;
    }
}
