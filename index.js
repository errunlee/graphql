const express = require("express");

const { ApolloServer } = require("@apollo/server");

const { expressMiddleware } = require("@apollo/server/express4");

const bodyParser = require("body-parser");
const axios = require("axios");
const cors = require("cors");

async function startServer() {
  const app = express();

  const server = new ApolloServer({
    typeDefs: `
        type Todo{
        title:String
        isCompleted:Boolean
        id:ID,
        userId:ID
        user:User
            }
      
        type User{
            id:ID
            username:String
            email:String
        }
            
      type Query{
        getTodos:[Todo]
        getUserById(id:ID!):User
         getUsers:[User]
      }

     
        `,

    resolvers: {
      Todo: {
        user: async (todo) => {
          const data = await axios.get(
            `https://jsonplaceholder.typicode.com/users/${todo.userId}`
          );
          return data.data;
        },
      },
      Query: {
        getTodos: async () => {
          const res = await fetch("https://jsonplaceholder.typicode.com/todos");
          const data = await res.json();
          return data;
        },

        getUsers: async () => {
          const res = await fetch("https://jsonplaceholder.typicode.com/users");
          return (data = await res.json());
        },

        getUserById: async (parent, { id }) => {
          const res = await fetch(
            `https://jsonplaceholder.typicode.com/users/${id}`
          );
          return (data = await res.json());
        },
      },
    },
  });
  app.use(bodyParser.json());

  app.use(cors());

  await server.start();

  app.use("/graphql", expressMiddleware(server));

  app.listen(5000, () => console.log("server started"));
}

startServer();
