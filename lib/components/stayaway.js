
import Component from './component';
import MSG from '../messages';
import Coord from '../coord';

const TAUNTS = ['haha', 'heh heh', 'hehe', 'ha ha', 'heheh', 'hahah', 'lol',
      'hahaha', 'ahaha', 'ha!', 'ugly human', 'go eat mud', 'hornless freak',
      'u dingus', 'go to heck', 'ya jerk', 'ya mug', 'u stink', ':P', "we'll get u"];

class StayAway extends Component {

    constructor(options) {
        super();
        this.distance = options.distance || 1000;
    }

    [MSG.turn_plan](data) {
        let target; 
        for(let s of this.entity.cansee) {
            if(s.tags.human) {
                target = s;
            }
        }
        if(target) {
            var shouldmove = true;
            if(this.entity.tags.sad) {
                shouldmove = Math.random() < 0.2;
            }
            if(shouldmove) {
                let difference = this.entity.pos.subtract(target.pos);
                let dist = difference.manhattan();
                difference = difference.rotate(Math.random() * Math.PI - (Math.PI/2));
                if(dist < this.distance) {
                    this.entity.message(MSG.move, { target: difference.unit(), priority: 10 });
                } else if(dist > this.distance + 1) {
                    this.entity.message(MSG.move, { target: difference.neg().unit(), priority: 10 });
                } else {
                    this.entity.message(MSG.move, { target: null, priority: 10 });
                    this.entity.message(MSG.say, this.entity.world.rng.choose(TAUNTS));
                }
            }
        }
    }

    [MSG.crack]() {
        this.distance = 1000;
    }
}

Component.register('stayaway', StayAway);
