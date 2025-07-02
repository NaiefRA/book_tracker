const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const maxAge = 3 * 24 * 60 * 60;

const handleError = (err) => {
  console.log(err.message, err.code);
};

const createToken = async function (id) {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: maxAge });
};

module.exports.signup_get = (req, res) => {
  console.log("signup");
};

module.exports.login_get = (req, res) => {
  console.log(login);
};

module.exports.signup_post = async (req, res) => {
  const { username, password, totalBooks, completedBooks } = req.body;
  console.log("Signing up");

  try {
    const user = await User.create({
      username,
      password,
      totalBooks,
      completedBooks,
    });

    // creating cookie to login on new signup
    const token = await createToken(user._id);
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: maxAge * 1000,
      sameSite: "None",
      secure: true,
      path: "/",
    });

    res.status(201).json({ user: user._id });
  } catch (err) {
    const errorMessage = handleError(err);
    res.status(400).json({ error: err.message });
  }
};

module.exports.login_post = async (req, res) => {
  const { username, password } = req.body;

  console.log("Logging in with", username);

  try {
    const user = await User.findOne({ username });

    if (!user) {
      throw Error("Incorrect username");
    }

    const auth = await bcrypt.compare(password, user.password);

    if (!auth) {
      throw Error("Incorrect password");
    }

    // creating cookie when auth is passed to login
    const token = await createToken(user._id);
    console.log("Login token created", token);

    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: maxAge * 1000,
      sameSite: "None",
      secure: true,
      path: "/",
    });

    res.status(200).json({ user: user._id });
  } catch (err) {
    handleError(err);
    res.status(400).json({ error: err.message });
  }
};

module.exports.logout_get = async (req, res) => {
  res.cookie("jwt", "", {
    maxAge: 1,
    httpOnly: true,
    sameSite: "None",
    secure: true,
    path: "/",
  });
  console.log("Logged out");
  res.status(200).json({ message: "Logged out" });
};

module.exports.get_username = async (req, res) => {
  const token = req.cookies.jwt;

  if (!token) return res.status(401).json({ error: "No token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("username");
    res.status(200).json({ username: user.username });
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
};
