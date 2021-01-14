const { UserInputError } = require('apollo-server');

const Post = require("../../models/Post")

module.exports = {
    Mutation: {
        createComment: async (_, { postId, body}, context) => {
             // we should be logged in here
            const  {username } = checkAut(context);
            // if someone makes an empty comment
            if(body.trim() === ''){
                throw new UserInputError('Empty Comment not allowed', {
                    errors: {
                        body: 'Comment body must not be empty'
                    }
                })
            }
            // always add await if it's asnycronous
            const post = await Post.findById(postId);

            if(post){
                // mongoose turns data models in to json objects
                post.comments.unshift({
                    body,
                    username,
                    createdAt: new Date().toISOString()
                })
                await post.save();
                    return post;
                
            } else throw new UserInputError('Post not found');
        }
    }
}