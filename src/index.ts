const { GraphQLServer } = require('graphql-yoga');

const typeDefs: string = `
type Query {
    info: String!
}`;

const resolvers: { Query: { info: () => string } } = {
    Query: {
        info: () => 'This is the API of a Hackernews Clone'
    }
};

const server = new GraphQLServer({
    typeDefs,
    resolvers,
});

server.start(() => console.log('Server is running on http://localhost:3000'))