//dependency imports
const { ApolloServer } = require('apollo-server');
const gql = require('graphql-tag');
const mongoose = require('mongoose');

//relative imports
const Post = require('./models/Post')
const { MONGODB } =require('./config.js');

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
//go to mongodb atlas dashboard, go to 'connect' grab your connection string and save it in a config.js file
//make the file secret then export to here - make sure to use useNewUrlParser to avoid deprication warning
// Warning when ran : (node:5064) DeprecationWarning: current Server Discovery and Monitoring engine is deprecated,
// and will be removed in a future version. To use the new Server Discover and Monitoring engine, 
//pass option { useUnifiedTopology: true } to the MongoClient constructor.
mongoose.connect( MONGODB, {useNewUrlParser: true}, { useUnifiedTopology: true })
    .then(() => {
        console.log('MongoDB is connected')
            // now we can start our server and specify a port
        return server.listen({ port: 5000})
    }).then(res => {
    // this makes it easier to open using the console
    console.log(`Server running at ${res.url}`)
})