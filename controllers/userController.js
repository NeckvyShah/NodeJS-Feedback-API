const mongoose = require("mongoose");
const User = require("../model/user");
const error = require("../utils/appError");

const signUp = async (req, res) => {
  try {
    const { username, email, password, passwordConfirm } = req.body;
    if (!username || !email || !password || !passwordConfirm) {
      return error(res, 400, "Username or email or Password is missing");
    }
    const user = await User.create({
      username,
      email,
      password,
      passwordConfirm,
    });
    // const user = new User({
    //   username,
    //   email,
    //   password,
    //   passwordConfirm,
    // });
    // user.password = await user.bcrypt();
    // await user.save();
    return res.status(200).json({
      data: user,
    });
  } catch (err) {
    return error(res, 500, err.message);
  }
};

module.exports = {
  signUp,
};
