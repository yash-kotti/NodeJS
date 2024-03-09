const express = require("express");
const userRoute = express.Router();
const { handleSignUp, handleLogin } = require("../controllers/users");

userRoute.post("/", handleSignUp);
userRoute.post("/login", handleLogin);

module.exports = userRoute;
