const postsResolvers = require('./posts');
const usersResolvers = require('./users');

module.exports = {
    Query: {
        ...postsResolvers.Query
    }
}

    //processes some sort of logic
    // const resolvers = {
    //     Query: {
    //        async getPosts() {
    //            try{
    //                const posts = await Post.find();
    //                return posts;
    //            } catch (err) {
    //                throw new Error(err);
    //            }
    //        }
    //         }
    //     } 