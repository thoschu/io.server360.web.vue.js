const express = require('express'),
    graphqlHTTP = require('express-graphql'),
    {buildSchema} = require('graphql'),
    cors = require('cors'),
    R = require('ramda'),
    app = express(),
    Resolver = require('./server-classes/resolver.class.js'),
    User = require('./server-classes/user.class.js'),
    Departments = require('./server-classes/departments.class.js'),
    protocoll = 'http',
    fqhn = 'localhost',
    graphqlPath = '/graphql',
    port = 4000;

// Schema auf Basis des GraphQL-Konzepts
const schema = buildSchema(`
    ${Resolver.schema}
    ${User.schema}
    ${Departments.schema}
`);

app.use(cors());

app.use(graphqlPath, graphqlHTTP({
    schema: schema,
    rootValue: new Resolver().root,
    graphiql: true
}));

app.listen(port);

console.log(`GraphQL-API-Server auf ${protocoll}://${fqhn}:${port}/${graphqlPath} ausführen`);
