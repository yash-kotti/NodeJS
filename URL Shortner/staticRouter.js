const express = require("express");
const URL = require("./models/url");
const userModel = require("./models/users");
const route = express.Router();

route.get("/", async (req, res) => {
  const allUrls = await URL.find({});
  // console.log(allUrls);
  console.log("Inside Static Router");
  res.render("Home", { urls: allUrls });
});

route.get("/signup", async (req, res) => {
  // const allUsers = await userModel.find({});
  res.render("Signup");
});
route.get("/login", async (req, res) => {
  res.render("Login");
});

module.exports = route;
