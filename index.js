//dependency imports
const { ApolloServer, PubSub } = require('apollo-server');
const mongoose = require('mongoose');

//relative imports
const typeDefs =require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
const { MONGODB } =require('./config.js');

const pubsub = new PubSub()

const PORT = process.env.port || 5000;

// set up apollo server
const server = new ApolloServer({
    typeDefs,
    resolvers,
    // for creating auth for a posts -allows us to access our request body in context
    context: ({ req }) => ({ req, pubsub })
});
//go to mongodb atlas dashboard, go to 'connect' grab your connection string and save it in a config.js file
//make the file secret then export to here - make sure to use useNewUrlParser to avoid depriciation warning
// Warning when ran : (node:5064) DeprecationWarning: current Server Discovery and Monitoring engine is deprecated,
// and will be removed in a future version. To use the new Server Discover and Monitoring engine, 
//pass option { useUnifiedTopology: true } to the MongoClient constructor.
mongoose.connect( MONGODB, {useNewUrlParser: true}, { useUnifiedTopology: true })
    .then(() => {
        console.log('MongoDB is connected')
            // now we can start our server and specify a port
        return server.listen({ port: PORT})
    }).then(res => {
    // this makes it easier to open using the console
    console.log(`Server running at ${res.url}`)
}).catch(err =>{
    console.error(err)
})