
import Component from './component';
import MSG from '../messages';
import Coord from '../coord';

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
                    this.entity.message(MSG.move, difference.unit());
                } else if(dist > this.distance + 1) {
                    this.entity.message(MSG.move, difference.neg().unit());
                } else {
                    this.entity.message(MSG.say, "haha");
                }
            }
        }
    }

    [MSG.crack]() {
        this.distance = 1000;
    }
}

Component.register('stayaway', StayAway);
