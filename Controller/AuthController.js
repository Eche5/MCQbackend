const User = require("../Model/userModel");
const jwt = require("jsonwebtoken");

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};
exports.Register = async (req, res) => {
  try {
    const newUser = await User.create({
      username: req.body.username,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
    });
    res.status(201).json({
      status: "success",
      data: newUser,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      data: error.message,
    });
  }
};
exports.Login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({
      status: "failed",
      message: "please provide a username and password",
    });
  }
  const user = await User.findOne({ username }).select("+password");

  if (!user || !(await user.comparePassword(password, user.password))) {
    return res
      .status(401)
      .json({ status: "failed", message: "incorrect username or password" });
  } else {
    const token = createToken(user._id);
    return res.status(200).json({
      status: `welcome ${username}`,
      token,
    });
  }
};
exports.DeleteAccount = (req, res) => {};
