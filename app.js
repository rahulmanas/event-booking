const express = require("express");
const {graphqlHTTP} = require("express-graphql");
const { buildSchema } = require('graphql')

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use('/graphql', graphqlHTTP({
  schema: buildSchema(`
    type RootQuery {
      events: [String!]!
    }

    type RootMutation {
      createEvent(name: String): String
    }

    schema {
      query: RootQuery
      mutation: RootMutation
    }
  `),
  rootValue: { //bundle of all resolvers. should have same names
    events: () => {
      return ['Romantic Cooking', 'Sailing', 'All Nighter']
    },
    createEvent: (args) => {
      const eventName = args.name;
      return eventName;
    }
  },
  graphiql: true
}));

// app.get('/', (req, res, next) => {
//   res.send('Hello World');
// })
app.listen(3000);

