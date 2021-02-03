// hold details about the schema -even though it is schema but gives us more safety when working with our server code

const { model, Schema } = require('mongoose');

const userSchema = new Schema({
    username: String,
    // will handle the require in graphql
    password: String,
    email: String,
    createdAt: String,
    bio: String
});

module.exports = model('User', userSchema);