const { ApolloServer, gql } = require("apollo-server");

//GraphQL Schemas
const typeDefs = gql`
  type ToDo {
    id: ID!
    title: String!
    description: String!
  }
  input ToDoInput {
    title: String!
    description: String!
  }
  type Query {
    getToDo(toDoId: ID!): ToDo!
    getToDos: [ToDo!]!
  }
  type Mutation {
    createToDo(toDoInput: ToDoInput): ToDo
    updateToDo(toDoId: ID!, toDoInput: ToDoInput): ToDo
    deleteToDo(toDoId: ID!): ToDo
    deleteToDos: [ToDo!]!
  }
`;
