const typeDefs = `
   type Book {
     _id: ID
     title: String
     authors: String
     description: String
     bookId: String
     image: String
     link: String
   }

   type User {
     _id: ID
     username: String
     email: String
     password: String
     books: [Book]
   }

   typeQuery {
    books: [Book]
   }
`;


module.exports = typeDefs;