const { UniqueDirectiveNamesRule } = require('graphql');
const Post = require('../../models/Post');
const checkAuth = require('../../util/check-auth');

module.exports = {
    
    //processes some sort of logic
// const resolvers = {
    Query: {
       async getPosts() {
           try{
               const posts = await Post.find();
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

            return post;
        }
    }
    // } 
}