const Post = require('../../models/Post');

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
       }
        }
    // } 
}