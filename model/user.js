const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  username: {
    type: "string",
    required: [true, "Please enter your name"],
    unique: true,
  },
  email: {
    type: "string",
    required: [true, "Please enter your email"],
    validate: [validator.isEmail, "Please enter a valid email"],
    unique: true,
    lowercase: true,
  },
  password: {
    type: "string",
    required: [true, "Please enter your password"],
    minlength: 10,
  },

  passwordConfirm: {
    type: String,
    required: [true, "Please CONFIRM your password"],
    // This validation only works for .create and .save
    validate: {
      validator: function (el) {
        return (el = this.password);
      },
      message: "Please enter the SAME password!!",
    },
  },
});

userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  return next();
});
// userSchema.methods.bcrypt = async function () {
//   return await bcrypt.hash(this.password, 12);
// };

const User = mongoose.model("user", userSchema);

module.exports = User;
