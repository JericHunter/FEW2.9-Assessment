  
require("dotenv").config();
const { ApolloServer, gql } = require("apollo-server");
const mongoose = require("mongoose");

//Connect to database
mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("Connected to database");
  })
  .catch((error) => {
    throw new Error(error);
  });

//Database Model
const toDoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});
const ToDo = mongoose.model("ToDo", toDoSchema);

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
