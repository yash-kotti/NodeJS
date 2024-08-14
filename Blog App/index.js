const path = require("path");
const express = require("express");
const app = express();
const userRoute = require("./routes/user");
const blogRoute = require("./routes/blog");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const {
  checkForAuthenticationCookie,
} = require("./middlewares/authentication");
const PORT = 8000;

mongoose
  .connect("mongodb://localhost:27017/blogify")
  .then(() => {
    console.log("Mongo Db Connected");
  })
  .catch((e) => {
    console.log("Error : " + e);
  });

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("Token"));

app.get("/", (req, res) => {
  res.render("home", { user: req.user });
});

app.use("/user", userRoute);
app.use("/blog", blogRoute);

app.listen(PORT, () => {
  console.log(`Server Running on PORT : ${PORT}`);
});
