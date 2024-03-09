const express = require("express");
const { connectMongoDB } = require("./connect");
const app = express();
const path = require("path");
const URL = require("./models/url");
const PORT = 8000;

const urlRoute = require("./routes/url");
const staticRoute = require("./staticRouter");
const userRoute = require("./routes/users");

connectMongoDB("mongodb://localhost:27017/short-url")
  .then(console.log("Connected to Mongo DB"))
  .catch((error) => {
    console.log("Error while connacting to the database : " + error);
  });

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

//Middleware
app.use(express.urlencoded({ extended: false })); // For encoded URL's

app.use(express.json()); // For JSON

app.use("/url", urlRoute);
// app.use("/url/:shortid", urlRoute);
app.use("/", staticRoute);
app.use("/user", userRoute); //For backend purpose such as when we pass the data from form to server.

// app.get("/test", async (req, res) => {
//   const allUrls = await URL.find({});
//   res.render("home", { urls: allUrls });
// });

// app.post("/url", async (req, res) => {
//   const body = req.body;
//   if (!body.url) {
//     res.status(400).json({ Error: "Provide URL" });
//   }
//   const shortIdGen = shortid(8);
//   await URL.create({
//     shortId: shortIdGen,
//     redirectURL: body.url,
//     visitHistory: [],
//   });
//   res.json({ id: shortIdGen });
// });

app.listen(PORT, () => {
  console.log("Server running on port : " + PORT);
});
