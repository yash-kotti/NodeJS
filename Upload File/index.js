const PORT = 8000;
const express = require("express");
const app = express();
const path = require("path");
// const ejs = require("ejs");

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());

app.get("/", (req, res) => {
  return res.render("Home");
});

app.listen(PORT, () => {
  console.log("Server started on PORT " + PORT);
});
