const express = require('express'),
    graphqlHTTP = require('express-graphql'),
    {buildSchema} = require('graphql'),
    cors = require('cors'),
    R = require('ramda'),
    rp = require('request-promise'),
    cheerio = require('cheerio'),
    app = express();

// Schema auf Basis des GraphQL-Konzepts
const schema = buildSchema(`
    type Query {
        hello: String
        world: String
        quoteOfTheDay: String
        random: Float!
        rollThreeDice: [Int]
        me: User
    }

    type User {
        id: String
        name: String
        towns: [String]
        departments: Departments
    }
    
    type Departments {
        kind(index: Int): String
        info: String
    }
`);

class User {
    constructor(name) {
        this._id = Math.random();
        this._name = name;
        this._towns = ['Hamburg', 'Bielefeld', 'St. Gallen'];
    }

    id() {
        return this._id;
    }

    name() {
        return this._name;
    }

    towns() {
        return this._towns
    }

    departments() {
        return new Departments();
    }
}

class Departments {
    constructor() {
        this._departments = ['RequireJS', 'CommonJS', 'AMD', 'ES2015'];
    }

    kind({index}) {
        return this._departments[index];
    }

    async info() {
        return await rp({
            uri: 'https://www.thomas-schulte.de/disclaimer.html',
            transform: body => {
                return cheerio.load(body);
            }
        })
        .then($ => {
            //const smwlih = R.join(' ', R.map(x => x === '' ? '❤' : x,  R.map(R.trim, R.split(' ', $('#software-made-with-love-in-hamburg').text()))));
            let smwlih = $('#software-made-with-love-in-hamburg').text();
            smwlih = R.split(' ', smwlih);
            smwlih = R.map(R.trim, smwlih);
            smwlih = R.map(x => x === '' ? '❤' : x, smwlih);
            return R.join(' ', smwlih);
        })
        .catch(err => {
            console.error(err);
        });
    }
}

// API-Root stellt eine Resolver-Funktion für jeden zugreifenden Endpunkt zur Verfügung
const root = {
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
        return [1, 2, 3].map(_ => 1 + Math.floor(Math.random() * 6));
    },
    me: () => {
        return new User('Tom S.');
    }
};

app.use(cors());

app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
}));

app.listen(4000);

console.log('GraphQL-API-Server auf localhost:4000/graphql ausführen');
