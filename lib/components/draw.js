
import Component from './component';
import MSG from '../messages';

const MARGIN = 4;
const OY = 6;

class Draw extends Component {

    constructor(data) {
        super(data);
        this.symbol = data.symbol || '?';
        this.color = data.color || '#aaa';
    }

    [MSG.draw](ctx) {
        let e = this.entity;
        let ts = ctx.ts;
        let px = e.pos.x * ts;
        let py = e.pos.y * ts;
        ctx.fillStyle = this.color;
        ctx.fillRect(px + MARGIN, py + MARGIN - 2, ts - 2*MARGIN, ts - MARGIN);
        ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
        ctx.fillRect(px + MARGIN, py + ts - 1.5*MARGIN, ts - 2*MARGIN, MARGIN);
        ctx.fillStyle = '#000';
        let ox = ctx.measureText(this.symbol).width / 2;
        ctx.fillText(this.symbol, px + ts/2 - ox, py + ts/2 + OY);
    }
    
}

Component.register('draw', Draw);
