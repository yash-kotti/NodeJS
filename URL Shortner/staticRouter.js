const express = require("express");
const URL = require("./models/url");
const userModel = require("./models/users");
const { restrictTo } = require("./middleware/auth");
const route = express.Router();

route.get("/admin", restrictTo(["ADMIN"]), async (req, res) => {
  const allUrls = await URL.find({});
  res.render("Home", { urls: allUrls });
});

route.get("/", restrictTo(["NORMAL", "ADMIN"]), async (req, res) => {
  // if (!req.user) return res.redirect("/login");
  const allUrls = await URL.find({
    createdBy: req.user._id,
  });
  // const allUrls = await URL.find({});
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
