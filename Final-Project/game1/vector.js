
class Vector {
    constructor(x, y) {
        if (x === undefined || y === undefined) {
            // throw new Error("Illegal State Undefined varibles passed to constructor!");
            this.x = 0;
            this.y = 0;
        } else {
            this.x = x;
            this.y = y;
        }
    }
}

function addVector(v1, v2) {
    v1.x += v2.x;
    v1.y += v2.y;
}
