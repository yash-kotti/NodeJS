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
  console.log("Email " + email);
  const user = await Users.findOne({
    email,
    password,
  });
  if (!user) {
    res.render("Login", { error: "Username or password is wrong" });
  }
  console.log("Inside Login");
  // const sessionId = uuidv4();
  const token = setUser(user);
  console.log("TOken " + token);
  // res.cookie("uid", token);
  // res.render("Home", { user: user });
  res.json({ token });
  // res.redirect("/");
}

module.exports = { handleSignUp, handleLogin };
