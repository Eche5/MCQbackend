const User = require("../Model/userModel");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

exports.Register = async (req, res) => {
  try {
    const { username } = req.body;
    const user = await User.findOne({ username });
    if (user)
      return res.status(404).json({ message: "Username Already Exists" });
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
exports.Login = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const foundUser = await User.findOne({ username }).exec();

  if (!foundUser) {
    return res.status(401).json({ message: "Username does not exist" });
  }

  const match = await foundUser.comparePassword(password, foundUser.password);

  if (!match)
    return res
      .status(404)
      .json({ message: "Username or Password is incorrect" });
  const id = foundUser._id;
  const accessToken = jwt.sign(
    {
      UserInfo: {
        username: foundUser.username,
      },
    },
    process.env.JWT_SECRET,
    { expiresIn: "10s" }
  );

  const refreshToken = jwt.sign(
    { username: foundUser.username },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: "7d" }
  );

  res.cookie("jwt", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  // Send accessToken containing username
  res.json({ foundUser, accessToken });
});

exports.refresh = (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) return res.status(401).json({ message: "Unauthorized" });
  const refreshToken = cookies.jwt;

  jwt.verify(
    refreshToken,
    process.env.JWT_REFRESH_SECRET,
    asyncHandler(async (err, decoded) => {
      if (err) return res.status(403).json({ message: "Forbidden" });

      const foundUser = await User.findOne({
        username: decoded.username,
      }).exec();

      if (!foundUser) return res.status(401).json({ message: "Unauthorized" });

      const accessToken = jwt.sign(
        {
          UserInfo: {
            username: foundUser.username,
          },
        },
        process.env.JWT_SECRET,
        { expiresIn: "15m" }
      );
      const id = foundUser._id;

      res.json({ foundUser, accessToken });
    })
  );
};
exports.LogOut = (req, res) => {
  const cookie = req.cookies;

  if (!cookie) return res.sendStatus(204); //No content
  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
  res.json({ message: "Cookie cleared" });
};

exports.DeleteAccount = (req, res) => {};
