
import Component from './component';
import MSG from '../messages';
import { getTime } from '../main';

const FONT = '16px monospace';

class Speaker extends Component {
    constructor(options) {
        super(options);
        this.bg = options.bg || '#fff';
        this.fg = options.fg || '#000';
    }

    attach(e) {
        super.attach(e);
        this.time = 0;
        this.phrase = null;
    }

    [MSG.say](text) {
        this.phrase = text;
        this.time = getTime();
        this.sad = false;
    }

    [MSG.draw_ui](ctx) {
        if(this.phrase) {
            let ts = ctx.ts;
            const height = 12;
            const offset = 10;
            let px = this.entity.pos.x * ts;
            let py = this.entity.pos.y * ts - height;
            ctx.font = FONT;
            var text = this.phrase;
            var w = ctx.measureText(text).width;
            var progress = (getTime() - this.time) / (text.length*0.2);
            var substr = text.substr(0, Math.floor(progress * 1.5 * text.length));
            ctx.fillStyle = this.bg;
            ctx.fillRect(px + ts/2 - w/2 - 4, py, w + 8, height);
            ctx.fillStyle = this.fg;
            ctx.fillText(substr, px + ts/2 - w/2, py + 10);
            if(progress >= 1) {
                this.time = 0;
                this.phrase = null;
            }
        }
    }
}

Component.register('speaker', Speaker);
