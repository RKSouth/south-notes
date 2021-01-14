const { gql } = require('apollo-server');

// where all of query types go
//always better to have the ! require field so we have more type safety
//notice use of back ticks
module.exports = gql`
    type Post{
        id: ID!
        body: String!
        createdAt:String!
        username:String!
        # exclamation point inside of array of array means the array needs to contain at least 1 element
        comments: [Comment]!
        likes: [Like]!
    }
    type Comment{
        id: ID!
        createdAt: String!
        username: String!
        body: String!
    }
    type Like{
        id: ID!
        createdAt: String!
        username: String!
    }
    type User{
        id: ID!
        email: String!
        token: String!
        username: String!
        createdAt: String!
    }
    input RegisterInput{
        username: String!
        password: String!
        confirmPassword: String!
        email: String!
    }
    type Query {
       getPosts: [Post]
       getPost(postId: ID!): Post
    }
    type Mutation {
        register(registerInput: RegisterInput): User!
        login(username: String!,
        # here we are returning the user
        password: String!):User!
        # editing the posts
        createPost(body: String!): Post!
        deletePost(postId: ID!): String!
        # editing the comments
        createComment(postId: String!, body: String!): Post!
        # you can take the comment id but using post id will allow us to check if the post is still up or not
        # you might have a mechanism if the post is deleted or not and if you check for the comment you might have a problem
        deleteComment(postId: ID!, commentId: ID!): Post!
        # for adjusting the likes
        # there is no unlike mutation because the like button will work as a toggle
        likePost(postId: ID!): Post!
    }

    # Do not delete below this line or else you have a very bad time
    `;
