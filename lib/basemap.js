
export default class BaseMap {
    
    constructor(w, h, defaultval) {
        this.width = w;
        this.height = h;
        this.tiles = new Array(w*h);
        this.tiles.fill(defaultval);
        this.defaultvalue = defaultval;
    }

    getTile(x, y) {
        if(x >= 0 && x < this.width &&
                y >= 0 && y < this.height) {
            return this.tiles[y * this.width + x];
        } else {
            return this.defaultvalue;
        }
    }

    setTile(x, y, val) {
        if(x >= 0 && x < this.width &&
                y >= 0 && y < this.height) {
            this.tiles[y * this.width + x] = val;
        }
    }

    line(x0, y0, x1, y1, cb) {
        let dx = Math.abs(x1 - x0);
        let dy = Math.abs(y1 - y0);
        let sx = (x0 < x1) ? 1 : -1;
        let sy = (y0 < y1) ? 1 : -1;
        let err = dx - dy;

        while(cb(this.getTile(x0, y0), x0, y0)){
            if ((x0 == x1) && (y0 == y1)) break;
            let e2 = 2 * err;
            if (e2 > -dy){ err -= dy; x0  += sx; }
            if (e2 <  dx){ err += dx; y0  += sy; }
        }
    }

    circle(centerX, centerY, radius, cb) {
        let d = 3 - (2 * radius);
        let x = 0;
        let y = radius;

        do {
            cb(centerX + x, centerY + y);
            cb(centerX + x, centerY - y);
            cb(centerX - x, centerY + y);
            cb(centerX - x, centerY - y);
            cb(centerX + y, centerY + x);
            cb(centerX + y, centerY - x);
            cb(centerX - y, centerY + x);
            cb(centerX - y, centerY - x);
            if (d < 0) {
                d = d + (4 * x) + 6;
            } else {
                d = d + 4 * (x - y) + 10;
                y--;
            }
            x++;
        } while (x <= y);
    }
}

