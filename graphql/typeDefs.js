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
    }
    type Mutation {
        register(registerInput: RegisterInput): User!
        login(username: String!,
        # here we are returning the user
        password: String!):User!
    }

    # Do not delete below this line or else you have a very bad time
    `;
