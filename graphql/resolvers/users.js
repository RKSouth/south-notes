const User = require('../../models/User');

module.exports = {
    Mutation: {
        //most of the time we will just args as part of the things we can get in our resolver arguements
        // parent gives you the result of what was the input of the last step, in some cases you can have multiple resolvers
        //implement resolver for the register and take in input
        register(_, args, context, info){
            // to do validate the user data
            // to do make sure user doesn't already exist
            // hash the password before we store it the database and create auth token
        }
    }
}