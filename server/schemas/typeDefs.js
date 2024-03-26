const typeDefs = `
   type Book {
     bookId: ID!
     title: String
     authors: [String]
     description: String
     image: String
     link: String
   }

   type User {
     _id: ID!
     username: String!
     email: String!
     password: String!
     savedBooks: [Book]
   }

   type Auth {
    token: ID!
    user: User
   }

   type Query {
    me: User
   }

   type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    saveBook(
      bookId: ID!
      authors: [String]
      description: String
      title: String
      image: String
      link: String
    ): User
    removeBook(bookId: ID!): User
   }
`;


module.exports = typeDefs;