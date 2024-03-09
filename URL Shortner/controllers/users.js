const Users = require("../models/users");

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
  res.render("Home", { user: user });
}

module.exports = { handleSignUp, handleLogin };
