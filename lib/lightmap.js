
import BaseMap from './basemap';

export default class LightMap extends BaseMap {
    
    constructor(w, h) {
        super(w, h, 0);
        this.explored = new Array(w*h);
        this.explored.fill(false);
    }

    setTile(x, y, val) {
        var ok = super.setTile(x, y, val);
        if(ok && val > 0) {
            this.explored[y * this.width + x] = true;
        }
        return ok;
    }

    draw(ctx) {
        let ts = ctx.ts;
        let lo = 0.95 + Math.random() * 0.10;
        for(let y = 0; y < this.height; ++y) {
            for(let x = 0; x < this.width; ++x) {
                let idx = y * this.width + x;
                let level = this.tiles[idx];
                let explored = this.explored[idx];
                if(!explored) {
                    // unexplored
                    ctx.fillStyle = '#000';
                    ctx.fillRect(x * ts, y * ts, ts, ts);
                } else if(level == 0) {
                    // fog of war
                    ctx.fillStyle = 'rgba(0, 10, 20, 0.5)';
                    ctx.fillRect(x * ts, y * ts, ts, ts);
                } else if(level < 1) {
                    // visible
                    var dim = (1 - level) * lo * 0.6;
                    ctx.fillStyle = 'rgba(40, 20, 0, ' + dim + ')';
                    ctx.fillRect(x * ts, y * ts, ts, ts);
                }
            }
        }
    }

}

