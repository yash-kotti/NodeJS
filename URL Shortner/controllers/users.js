const Users = require("../models/users");
const { v4: uuidv4 } = require("uuid");
const { setUser } = require("../service/auth");

async function handleSignUp(req, res) {
  const { userName, email, password } = req.body;
  const allUsers = await Users.create({
    userName,
    email,
    password,
  });
  res.render("Signup", { users: allUsers });
}

async function handleLogin(req, res) {
  const { email, password } = req.body;
  const user = await Users.findOne({
    email,
    password,
  });
  if (!user) {
    res.render("Login", { error: "Username or password is wrong" });
  }
  console.log("Inside Login");
  const sessionId = uuidv4();
  setUser(sessionId, user);
  res.cookie("uid", sessionId);
  // res.render("Home", { user: user });
  res.redirect("/");
}

module.exports = { handleSignUp, handleLogin };
