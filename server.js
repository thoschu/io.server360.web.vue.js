const express = require('express'),
    graphqlHTTP = require('express-graphql'),
    {buildSchema} = require('graphql'),
    cors = require('cors'),
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
