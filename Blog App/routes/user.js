const { Router } = require("express");
const User = require("../models/users");

const router = Router();

router.get("/signin", (req, res) => {
  res.render("signin");
});
router.get("/signup", (req, res) => {
  res.render("signup");
});
router.post("/signin", async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  try {
    const token = await User.matchedPasswordAndGenerateToken(email, password);
    return res.cookie("Token", token).redirect("/");
  } catch (error) {
    return res.render("signin", { error: "Incorrect Email or Password" });
  }
});
router.post("/signup", async (req, res) => {
  console.log(req.body);
  const { fullname, email, password } = req.body;
  await User.create({
    fullname,
    email,
    password,
  });
  res.redirect("/");
});
router.get("/logout", (req, res) => {
  console.log("Log out");
  res.clearCookie("Token").redirect("/");
});
module.exports = router;
