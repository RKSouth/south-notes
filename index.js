const { ApolloServer } = require('apollo-server');
const gql = require('graphql-tag')

// where all of query types go
//always better to have the ! require field so we have more type safety
const typeDefs = gql`
    type Query{
        sayHi: String!
    }
    
    `