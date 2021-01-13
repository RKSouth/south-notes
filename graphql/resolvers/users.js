const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');

const { SECRET_KEY} = require("../../config");
const User = require('../../models/User');

module.exports = {
    Mutation: {
        //most of the time we will just args as part of the things we can get in our resolver arguements
        // parent gives you the result of what was the input of the last step, in some cases you can have multiple resolvers
        //implement resolver for the register and take in input
        //   register(parent, args, context, info){
        register(_,{ registerInput: { username, email, password, confirmPassword}
        } ,
         context, info
         ){
            // to do validate the user data
            // to do make sure user doesn't already exist
            // hash the password before we store it the database and create auth token
            // we use await here because bcrypt is asyncrouns
            password = await bcrypt.hash(password, 12);

            // here is where we form our user object

            const newUser = new User({
                email,
                username,
                password,
                createdAt: new Date().toISOString()
            });
            // saving newUser info to the database
            const res = await newUser.save()

            // create new token for our user
            const token = jwt.sign({
                id: res.id,
                email: res.email,
                username: res.username
                // here is were we give it a secret -store in the config file as well
            }, SECRET_KEY, { expiresIn: '1h' });

            return {
                ...res._doc,
                id: res._id,
                token
            }
        }
    }
}