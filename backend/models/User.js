const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: [true, "First name is required."],
  },
  lname: {
    type: String,
    required: [true, "Last name is required."],
  },
  email: {
    type: String,
    unique: [true, "Email already exists."],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\\.,;:\s@"]+\.)+[^<>()[\]\\.,;:\s@"]{2,})$/i,
      "Please enter a valid email.",
    ],
    required: [true, "Email is required."],
  },
  password: {
    type: String,
    required: [true, "Password is required."],
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
