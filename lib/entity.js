
import Component from './components/component';
import './components/index';
import MSG from './messages';

let ID = 0;

export default class Entity {
    constructor(world, pos, components) {
        this.id = ID++;
        this.world = world;
        this.pos = pos.clone();
        this.components = [];
        this.responders = {};
        var comps = components || {};
        for(let k of Object.keys(comps)) {
            var c = Component.create(k, comps[k]);
            if(c) {
                this.addComponent(c);
            } else {
                console.log("Could not attach component", k, comps[k]);
            }
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
            return o !== c;
        });
        for(let key in MSG) {
            var sym = MSG[key];
            if(c[sym]) {
                this.responders[sym] = this.responders[sym].filter(function(r) {
                    return r != c;
                });
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

    canSee(e, cb) {
    }
}

