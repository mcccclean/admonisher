
export default class Coord {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    set(x, y) {
        this.x = x;
        this.y = y;
    }

    modify(c) {
        this.x += c.x;
        this.y += c.y;
    }

    clone() {
        return new Coord(this.x, this.y);
    }

    add(c) {
        return new Coord(this.x + c.x, this.y + c.y);
    }

    subtract(c) {
        return new Coord(this.x - c.x, this.y - c.y);
    }

    manhattan() {
        return Math.abs(this.x) + Math.abs(this.y);
    }

    length() {
        return Math.sqrt((this.x * this.x) + (this.y * this.y));
    }
}
