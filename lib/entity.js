
import Component from './components/component';
import './components/index';
import MSG from './messages';

export default class Entity {
    constructor(world, pos, options) {
        this.world = world;
        this.pos = pos.clone();
        this.symbol = options.symbol || '?';
        this.color = options.color || '#000';
        this.components = [];
        this.responders = {};
        console.log(Component);
        this.addComponent(Component.create('walker', {}));
    }

    addComponent(c) {
        this.components.push(c);
        c.attach(this);
        for(let key in MSG) {
            var sym = MSG[key];
            if(c[sym]) {
                let h = this.responders[sym];
                if(!h) {
                    h = [];
                    this.responders[sym] = h;
                }
                h.push(c);
            }
        }
    }

    message(sym, data) {
        let h = this.responders[sym];
        if(h) {
            for(let c of h) {
                c[sym](data);
            }
        }
    }
}
