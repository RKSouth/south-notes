const gql = require('apollo-server');

// where all of query types go
//always better to have the ! require field so we have more type safety
//notice use of back ticks
module.exports = gql`
    type Post{
        id: ID!
        body: String!
        createdAt:String!
        username:String!
    }
    type Query{
       getPosts: [Post]
    }
    `
