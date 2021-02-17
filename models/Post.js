
const { model, Schema } = require('mongoose');

const postSchema = new Schema({
    body: String,
    // will handle the require in graphql
    // username: String,
    createdAt: String,
    comments: [
        {
            body: String,
            username: String,
            createdAt: String
        }
    ],
    likes: [
        {
            username: String,
            createdAt: String
        }
    ],
    // allows us to later use mongoose to automatically pop user field
    author: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }
});

module.exports = model('Post', postSchema);