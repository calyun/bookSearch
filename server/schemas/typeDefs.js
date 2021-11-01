const { gql } = require('apollo-server-express');

const typeDefs = gql`

    type User {
        _id: ID!
        username: String!
        email: String!
        password: String!
        bookCount: Int
        savedBooks: [Book]
    }

    type Book {
        bookId: ID!
        authors: [String]
        description: String
        bookId: String
        image: String
        link: String
        title: String
    }
    
    input savedBook {
        authors: [String]
        description: String
        bookId: String
        image: String
        link: String
        title: String
    }

    type Query {
        user: User
    }

    type Mutation{
        createUser(username: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
        saveBook(input: savedBook!): User
        deleteBook(book: ID!): User
    }
    type Auth {
        token: ID!
        user: User
    }
`;

module.exports = typeDefs;