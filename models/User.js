// hold details about the schema -even though it is schema but gives us more safety when working with our server code

const { model, Schema } = require('mongoose');

const userSchema = new Schema({
    username: String,
    image: {
        type: String,
        default: null
    },
    // will handle the require in graphql
    password: String,
    email: String,
    createdAt: String,
    posts: [
        {
          type: Schema.Types.ObjectId,
          ref: "Post",
        },
      ],
    bio: {
      type: String,
      default: null
  }
});

module.exports = model('User', userSchema);