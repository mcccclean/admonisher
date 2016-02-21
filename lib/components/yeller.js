
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

    [MSG.turn_act](data) {
        if(Math.random() < 0.1) {
            var s = Math.floor(MESSAGES.length * Math.random());
            this.entity.message(MSG.say, MESSAGES[s]);
        }
    }
}

Component.register('yeller', Yeller);
