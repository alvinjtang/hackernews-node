const { GraphQLServer } = require('graphql-yoga');

let links = [{
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL'
}];

let idCount = links.length;

const resolvers = {
    Query: {
        info: () => `This is the API of a Hackernews Clone`,
        link: (parent, args) => {
            return links.filter(x => x.id === args.id)[0]
        },
        feed: () => links,
    },
    Mutation: {
        post: (parent, args) => {
            const link = {
                id: `link-${idCount++}`,
                description: args.description,
                url: args.url,
            }
            links.push(link)
            return link
        },
        updateLink: (parent, args) => {
            const updatedLink = {
                id: args.id,
                description: args.description,
                url: args.url,
            }
            for (let i = 0; i < links.length; i++) {
                if (links[i].id === args.id) {
                    links[i] = {...links[i], ...updatedLink}
                }
            }
            return updatedLink;
        },
        deleteLink: (parent, args) => {
            let has = false;
            for (let i = 0; i < links.length; i++) {
                if (links[i].id === args.id) has = true;
            }
            if (has) {
                for (let i = 0; i < links.length; i++) {
                    links = links.filter(x => x.id !== args.id)
                }
            }
            return;
        }
    },
};

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
});

server.start(() => console.log('Server is running on http://localhost:4000'));