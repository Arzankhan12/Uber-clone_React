const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        minlength: [3, "Full name must be at least 3 characters long"],
      },
      Lastname: {
        type: String,
        minlength: [3, "Last name must be at least 3 characters long"],
      },
      email: {
        type: String,
        required: true,
        unique: true,
        minlength: [5, "Email must be at least 5 characters long"],
      },
      password: {
        type: String,
        required: true,
        select: false,
      },
      socketId: {
        type: String,
      },
})


// Generate JWT token
userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET);
    return token;
  };
  
  // Compare provided password with hashed password
  userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
  };
  
  // Hash a password
  userSchema.methods.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
  };
  
  const userModel = mongoose.model("user", userSchema);
  
  module.exports = userModel;