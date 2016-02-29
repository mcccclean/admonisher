
var codex = {
    mayor: {
        yeller: {},
        walker: {},
        looker: {},
        tags: { tags: ['human'] },
        speaker: { fg: '#fff', bg: '#300' },
        draw: { symbol: '@', color: '#eee' },
        interactor: {}
    },
    goblin: { 
        yelper: {},
        stayaway: { distance: 3 },
        wander: {},
        looker: {},
        walker: {},
        psyche: {},
        speaker: {},
        tags: { tags: ['goblin'] },
        draw: { symbol: 'g', color: '#2a2' },
    },
    cave_down: {
        draw: { symbol: '>', color: '#533' },
        levelexit: {}
    },
    cave_up: {
        draw: { symbol: '<', color: '#daa' }
    }
};

export default codex;
