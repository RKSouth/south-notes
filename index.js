const { ApolloServer } = require('apollo-server');
const gql = require('graphql-tag')

// where all of query types go
//always better to have the ! require field so we have more type safety
//notice use of back ticks
const typeDefs = gql`
    type Query{
        sayHi: String!
    }
    `
    //processes some sort of logic
const resolvers = {
   Query: {
       sayHi: () => 'Hello World'
       }
   } 

// set up apollo server
const server = new ApolloServer({
    typeDefs,
    resolvers
});
// now we can start our server and specify a port
server.listen({ port: 5000})
// returning a promise
.then(res => {
    // this makes it easier to open using the console
    console.log(`Server running at ${res.url}`)
})