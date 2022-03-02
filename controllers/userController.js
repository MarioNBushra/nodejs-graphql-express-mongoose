const UserModel = require("../models/user");

exports.userRegister = async (req, res) => {
  try {
    const newUser = new UserModel(req.body);
    await newUser.save();
    res.send(newUser);
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
};
