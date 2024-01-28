const express = require("express");
const users = require("./MOCK_DATA.json");
const fs = require("fs");
const app = express();
const PORT = 8000;

//MiddleWare or plugin
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  console.log("In the middleware 1 ");
  fs.appendFile(
    "./log.txt",
    `\n${Date.now()} : ${req.method} : ${req.path}`,
    (err, data) => {
      next();
    }
  );
});
// app.post("/api/users", (req, res) => {
//   return res.send("Yash");
// });

app.get("/api/users", (req, res) => {
  // console.log(res.json(data));
  // console.log(req.myusername);
  res.setHeader("X-Myname", "Yash");
  return res.status(200).json(users);
});

// To have it in one place

// app
//   .route("/api/users/:id")
//   .get((req, res) => {
//     console.log("Inside get ");
//   })
//   .put((req, res) => {
//     console.log("Inside put");
//   });

app.get("/users", (req, res) => {
  const html = `<ul> ${users
    .map((users) => `<li>${users.first_name}</li>`)
    .join("")}</ul>`;
  res.send(html);
});
app.get("/api/users/:userid", (req, res) => {
  const userid = Number(req.params.userid);
  const user = users.find((users) => users.id === userid);
  if (!user) {
    res.status(404).json({ Message: "User doesn't exist" });
  }
  res.json(user);
});
app.post("/api/users", (req, res) => {
  // Create new user
  const body = req.body;
  if (
    !body ||
    !body.first_name ||
    !body.last_name ||
    !body.email ||
    body.gender ||
    body.job_title
  ) {
    res.status(400).json({ Message: "Required all the fields" });
  }
  users.push({ ...body, id: users.length + 1 });
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    return res.status(201).json({ Status: "Success", ID: users.length });
  });
  // console.log("User created with Id : ");
  // return res.send("pending");
});
app.patch("/api/users/:id", (req, res) => {
  console.log("Update a user");
});
app.delete("/api/users/:id", (req, res) => {
  console.log("Delete a user");
});
app.listen(PORT, () => {
  console.log(`Server running on port : ${PORT}`);
});
