const User = require("../models/user.model.js"); // user account logic
const { validationResult } = require("express-validator");

module.exports.registerUser = async (req, res, next) => {
  const { firstName,lastName, email, password } = req.body;

  const existingUser = await User.findOneAndReplace({ email });
  if (existingUser) {
    return res.status(400).json({ message: "Email already exists" });
  }



  const hashedPassword = await User.hashPassword(password);

  const user = await User.create({
    firstName,lastName,
    email,
    password: hashedPassword,
  });
  const token = user.generateAuthToken();

  res.status(201).json({ token, user });
};