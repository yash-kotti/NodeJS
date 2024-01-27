const http = require("http");
const fs = require("fs");
const url = require("url");
const express = require("express");
const app = express();
// For creating a server we would use createServer in it we have a callback function
// Which will give the req and res
// req will be the request by the client and had all the info about it.
// res.end() It will be the response from server.
function myHandler(req, res) {
  const myUrl = url.parse(req.url, true);
  // console.log(myUrl);
  if (myUrl.pathname === "/favicon.ico") res.end();
  else {
    const log = `${Date.now()} : ${req.method} : ${
      req.url
    } New Request received\n`;
    fs.appendFile("./log.txt", log, (err, data) => {
      switch (myUrl.pathname) {
        case "/":
          if (req.method === "GET") {
            res.end("Homepage");
          }

          break;
        case "/about":
          res.end(" I am yash kotti");
          break;
        case "/signup":
          if (req.method === "GET") {
            res.end("Fill the sign up form");
          } else if (req.method === "POST") {
            res.end("Sign up completed");
          }
          break;
        default:
          res.end("404 Not found");
          break;
      }
    });
  }
}
app.get("/about", (req, res) => {
  return res.send("In the about page");
});
app.get("/", (req, res) => {
  return res.send(`In the home page ${req.query.name}`);
});
app.listen(8000, () => {
  console.log("Server running on port 8000");
});
// const myserver = http.createServer(app);

// We have created a server now we would have to run it
// for that we would choose the port on which it sholud be run
// IT will clg on the console of the server.
// myserver.listen(8000, () => {
//   console.log("Server running on port 8000");
// });
