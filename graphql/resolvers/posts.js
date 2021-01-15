const {AuthenticationError, UserInputError } = require('apollo-server');

const Post = require('../../models/Post');
const checkAuth = require('../../util/check-auth');


module.exports = {
    
    //processes some sort of logic
// const resolvers = {
    Query: {
       async getPosts() {
           try{
            //    in order to srt posts so the latest show up on top and the older ones on the bottom
            // we just need to sort  by createdAt so instead of:
            //    const posts = await Post.find();
            const posts = await Post.find().sort({createdAt: -1})
               return posts;
           } catch (err) {
               throw new Error(err);
           }
       },
       async getPost(_, {postId}){
           try{
               const post = await Post.findById(postId);
               if(post){
                   return post;
               } else {
                   throw new Error('Post not found')
                }
           } catch(err){
               throw new Error(err);
           }
       }
    },
    Mutation: {
        async createPost(_, { body }, context){
            // user will log in and get auth token and then need to put in auth header and send that header with the request
            // and we need to get that token and then decode it and get info from it 
            //and make sure that the user is authenticated and then create the post
            const user = checkAuth(context);
            console.log(user)
// these come from the post model
            const newPost = new Post({
                body,
                user: user.id,
                username: user.username,
                createdAt: new Date().toISOString()
            });
            // to save the post
            const post = await newPost.save();
            // for adding a subscription
            context.pubsub.publish('NEW_POST', {
                newPost: post
            })

            return post;
        },
        async deletePost(_, { postId }, context){
            const user =checkAuth(context);
            // because we don't any user to delete just any post
            try{
                const post = await Post.findById(postId);
                if(user.username === post.username){
                    await post.delete();
                    return 'Post deleted successfully';

                } else {
                    throw new AuthenticationError('Action not allowed');
                }
            } catch (err) {
                throw new Error(err);
            }
        },
        async likePost(_, { postId }, context){
            const { username } = checkAuth(context);

            const post = await Post.findById(postId);
            if(post){
                if(post.likes.find(like => like.username === username)){
                    // post already liked, unlike
                    post.likes = post.likes.filter(like => like.username !== username );
                    await post.save();
                } else {
                    post.likes.push({
                        username,
                        createdAt: new Date().toISOString()
                    })
                }
                await post.save();
                return post;
            }   else throw new UserInputError('Post not found')
        } 
    },
    Subscription: {
        newPost: {
            subscribe: (_, __, {pubsub}) => pubsub.asyncIterator( 'NEW_POST')
        }
    }
    // } 
}