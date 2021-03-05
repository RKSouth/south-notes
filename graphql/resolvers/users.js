const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const { UserInputError } = require('apollo-server')

const { validateRegisterInput, 
        validateLoginInput
     } = require('../../util/validators')
const { SECRET_KEY} = require("../../config");
const User = require('../../models/User');

function generateToken(user){
  return jwt.sign({
        id: user.id,
        email: user.email,
        username: user.username
        // here is were we give it a secret -store in the config file as well
    }, SECRET_KEY, { expiresIn: '5h' });

}


module.exports = {
    Mutation: {
        //most of the time we will just args as part of the things we can get in our resolver arguments
        // parent gives you the result of what was the input of the last step, in some cases you can have multiple resolvers
        //implement resolver for the register and take in input
        //   register(parent, args, context, info){
            async login(_, { username, password }) {
                const { errors, valid } = validateLoginInput(username, password);
                //we need to throw an error of the valid is false in here too
                if(!valid){
                    throw new UserInputError('Errors' , { errors })
                }
                const user = await User.findOne({ username });

                if(!user){
                    errors.general = 'user not found';
                    throw new UserInputError('user not found', { errors });
                }
                const match = await bcrypt.compare(password, user.password);
                if(!match){
                    errors.general = 'wrong password';
                    throw new UserInputError('wrong password', { errors });
                }
                // if the username and password are correct we need to issue them a token
                const token = generateToken(user);

                
            return {
                ...user._doc,
                id: user._id,
                token
            };
            },
        
            // async editUser(_, { username, bio }) {
            //     const { errors, valid } = validateBioInput(username,  bio);
            //     //we need to throw an error of the valid is false in here too
            //     if(!valid){
            //         throw new UserInputError('Errors' , { errors })
            //     }
            //     const user = await User.findOne({ username });

          
                
                  
            // return {
            //     ...user._doc,
            //     id: user._id,
            //     bio: user._bio
            // };
            // },    

         async register(_,{ 
             registerInput: { username, email, password, confirmPassword}
        }
        ){
            // to do validate the user data
            const {valid, errors } = validateRegisterInput(
                username, 
                email, 
                password, 
                confirmPassword
                 )
            if(!valid){
                throw new UserInputError('Errors', {errors});
            }
            // to do make sure user doesn't already exist
            // hash the password before we store it the database and create auth token
            // we use await here because bcrypt is asyncrouns
            password = await bcrypt.hash(password, 12);

            // making sure we don't create 2 users with the same username
            const user = await User.findOne({ username })
            if(user){
                throw new UserInputError('Username is already taken, please choose another', {
                    errors: {
                        username: 'This username is taken'
                    }
                })
            }

            // here is where we form our user object
            const newUser = new User({
                email,
                username,
                password,
                bio,
                createdAt: new Date().toISOString()
            });
            // saving newUser info to the database
            const res = await newUser.save()

            // create new token for our user
            // see generate token function above
            const token = generateToken(res);

            return {
                ...res._doc,
                id: res._id,
                token
            }
        }
    }
}