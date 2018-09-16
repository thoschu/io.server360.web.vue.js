const User = require('./user.class.js');

let _schema = `
    type Query {
        hello: String
        world: String
        quoteOfTheDay: String
        random: Float!
        rollThreeDice: [Int]
        me: User
    }
`;

class Resolver {
    constructor(root) {
        this.root = root || {
            hello: () => {
                return 'Hello Vue.js by Tom S.';
            },
            world: () => {
                return 'Hallo Hamburg...';
            },
            quoteOfTheDay: () => {
                return Math.random() < 0.5 ? 'Take it easy' : 'Salvation lies within';
            },
            rollThreeDice: () => {
                return [1, 2, 3].map(_ => _ + Math.floor(Math.random() * 6));
            },
            me: () => {
                return new User('Tom S.');
            }
        };
    }

    // API-Root stellt eine Resolver-Funktion für jeden zugreifenden Endpunkt zur Verfügung
    get root() {
        return this._root;
    }
    set root(root) {
        this._root = root;
    }

    static get schema() {
        return _schema;
    }
}

module.exports = Resolver;
