const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const graphqlSchema = require("./graphql/schema");
const graphqlResolver = require("./graphql/resolvers");
const auth = require("./middleware/auth");
const app = express();

// const dotenv = require("dotenv")

require("./db/mongoose");
require("dotenv").config();

app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 6060;

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

app.use(auth);

app.use(
  "/graphql",
  graphqlHTTP({
    schema: graphqlSchema,
    rootValue: graphqlResolver,
    graphiql: true,
    formatError(err) {
      if (!err.originalError) {
        return err;
      }
      const data = err.originalError.data;
      const message = err.message || "An Error Occured";
      const code = err.originalError.code || 500;
      return { message, data, code };
    },
  })
);

//////////////////////// S T A R T - C O R S ////////////////////////
const cors = require("cors");

app.use(cors());

//////////////////////// E N D - C O R S ////////////////////////

//////////////////////// S T A R T - R O U T E S ////////////////////////
const userRoutes = require("./routes/userRoutes");

app.use("/api/user", userRoutes);
//////////////////////// E N D - R O U T E S ////////////////////////

app.listen(port, () => {
  console.log("server is up on", port);
});
