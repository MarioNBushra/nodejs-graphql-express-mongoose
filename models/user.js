const mongoose = require("mongoose");
// const validator = require("validator");
// const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const Task = require('./task')
// const crypto = require("crypto");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true, // trim in mongoose use to remove the white spaces from the strings
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },

    status: {
      type: String,
    },
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Posts",
      },
    ],
  },
  { timestamps: true }
);

userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();
  delete userObject.password;
  return userObject;
};

// userSchema.methods.generateAuthToken = async function () {
//   const user = this;
//   const token = jwt.sign({ _id: user._id.toString() }, "MarioBushra");
//   user.tokens = user.tokens.concat({ token });
//   await user.save();
//   return token;
// };

const User = mongoose.model("User", userSchema);

module.exports = User;
