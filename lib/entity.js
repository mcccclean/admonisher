
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
        var comps = options.components || {};
        for(let k of Object.keys(comps)) {
            this.addComponent(Component.create(k, comps[k]));
        }
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

    detachComponent(c) {
        this.components = this.components.filter(function(o) {
            return o === c;
        });
        for(let key in MSG) {
            if(c[sym]) {
                delete this.responders[sym];
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
