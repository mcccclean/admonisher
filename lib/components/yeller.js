
import Component from './component';
import MSG from '../messages';

let MESSAGES = [
    'hey!',
    'oi!',
    'knock it off!',
    'you little buggers!',
    'stop it!',
    'enough!',
    'that\'s it!'
];

class Yeller extends Component {

    constructor(options) {
        super(options);
        this.target = null;
        this.lasttarget = null;
    }

    [MSG.turn_plan](data) {
        let see = this.entity.cansee;
        let gob = null;
        let yellseen = false;

        for(let s of see) {
            console.log(s);
            if(s.tags && s.tags.goblin && !s.tags.sad) {
                gob = s;
                if(s == this.yellat) {
                    break;
                }
            }
        }
        this.lasttarget = this.target;
        this.target = gob;
    }

    [MSG.draw_ui](ctx) {
        if(this.yellat) { 
            let ts = ctx.ts;
            var f = function(n) { return n * ts + ts/2; };
            ctx.strokeStyle = "#f0f";
            ctx.beginPath();
            ctx.moveTo(f(this.entity.pos.x), f(this.entity.pos.y));
            ctx.lineTo(f(this.yellat.pos.x), f(this.yellat.pos.y));
            ctx.stroke();
        }
    }

    [MSG.turn_act](data) {
        let msg = null;
        if(this.target && !this.lasttarget) {
            // fresh target
            msg = "oi!";
        } else if(!this.target && this.lasttarget) {
            // lost target
            msg = "where'd you go?";
        } else if(this.target) {
            // continued target
            msg = 'yeah, you!';
        } else {
            // still no target
            msg = 'hmm...';
            if(Math.random() < 0.1) {
            }
        }
        if(msg) {
            this.entity.message(MSG.say, msg);
        }
    }
}

Component.register('yeller', Yeller);
