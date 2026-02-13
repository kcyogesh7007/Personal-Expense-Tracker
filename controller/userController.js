const User = require("../model/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({
      message: "Please provide email,name and password",
    });
  }
  const userExist = await User.findOne({ email });
  if (userExist) {
    return res.status(400).json({
      message: "User with that email address already exist",
    });
  }
  await User.create({
    name,
    email,
    password: bcrypt.hashSync(password, 10),
  });
  res.status(201).json({
    message: "User registered successfully",
  });
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      message: "Please provide email and password",
    });
  }
  const userExist = await User.findOne({ email });
  if (!userExist) {
    return res.status(400).json({
      message: "No user found with that email address",
    });
  }
  const isPasswordMatch = bcrypt.compareSync(password, userExist.password);
  if (!isPasswordMatch) {
    return res.status(400).json({
      message: "Invalid credentials",
    });
  }
  const token = jwt.sign({ id: userExist._id }, process.env.SECRET_KEY, {
    expiresIn: "7d",
  });
  res.status(200).json({
    message: "User loggedIn successfully",
    token,
  });
};
