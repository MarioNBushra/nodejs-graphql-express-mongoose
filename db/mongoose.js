const mongoose = require("mongoose");

try {
  mongoose.connect("mongodb://127.0.0.1:27017/graphql", {
    useNewUrlParser: true,
  });
  console.log("MongoDB IS CONNECTED");
} catch (error) {
  console.log(error);
  console.log("Hello FROM DB ERROR");
}
