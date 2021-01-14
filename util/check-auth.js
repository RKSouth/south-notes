const {AuthenticationError } = require('apollo-server');

const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('./../config');


module.exports = (context) => {
    //context will have an object and will have headers inside of it
    const authHeader = context.req.headers.authorization;
    //need to check for it and make sure someone sent this header
    if(authHeader){
        //we split this by bearer meaning it will have 2 strings
        // and the second is the actual token because split turns a rray of a couple of strings
        const token = authHeader.split('Bearer ')[1];
        //now we need to verify the token
        if(token){
            try{
                // try because it could fail!
                // pass the user jwt the token and the secret key
                const user = jwt.verify(token, SECRET_KEY);
                return user;
            } catch(err){
                throw new AuthenticationError('Invalid/Expired token')
            }
        }
        // this is where we tell the user why it failed
        throw new Error('Authentication token must be \'Bearer [token]')
    }
    // if we didn't get an auth header
    throw new Error('Authorization header must be provided')
}