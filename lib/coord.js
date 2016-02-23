
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

    neg() {
        return new Coord(-this.x, -this.y);
    }

    angle() {
        return Math.atan2(this.y, this.y);
    }   

    rotate(th) {
        let r = this.length();
        th += this.angle();
        return new Coord( Math.cos(th) * r, Math.sin(th) * r);
    }

    unit() {
        if(this.x === 0 && this.y === 0) {
            return new Coord(0, 0);
        } else if(Math.abs(this.x) < Math.abs(this.y)) {
            if(this.y < 0) {
                return new Coord(0, -1);
            } else {
                return new Coord(0, 1);
            }
        } else {
            if(this.x < 0) {
                return new Coord(-1, 0);
            } else {
                return new Coord(1, 0);
            }
        }
    }
}
