
import BaseMap from './basemap';

export default class LightMap extends BaseMap {
    
    constructor(w, h) {
        super(w, h, 0);
    }

    draw(ctx) {
        let ts = ctx.ts;
        let lo = Math.random() * 0.05;
        for(let y = 0; y < this.height; ++y) {
            for(let x = 0; x < this.width; ++x) {
                let level = 1 - this.getTile(x, y);
                if(level > 0) {
                    ctx.fillStyle = 'rgba(0, 0, 0, ' + (level + lo) + ')';
                    ctx.fillRect(x * ts, y * ts, ts, ts);
                }
            }
        }
    }

}

