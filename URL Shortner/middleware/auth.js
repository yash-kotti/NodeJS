const { getUser } = require("../service/auth");

async function restrictToLoggedInUser(req, res, next) {
  // console.log("Request object", req);
  // const userUid = req.cookies.uid;
  var userUid = req.headers["authorization"];
  if (!userUid) return res.redirect("/login");
  const token = userUid.split("Bearer ")[1];
  const user = getUser(token);
  console.log("USER", user);
  if (!user) return res.redirect("/login");
  req.user = user;
  next();
}

async function checkAuth(req, res, next) {
  // console.log("Request object", req);
  // const token = req.cookies.uid;
  //  Trying with the token
  // console.log(req);
  const userUid = req.headers["authorization"];
  console.log("USer ID  " + userUid);
  if (!userUid) return res.redirect("/login");
  console.log("UserUID " + userUid);
  const token = userUid.split("Bearer ")[1];
  const user = getUser(token);
  // console.log("USER Check Auth" + user);
  req.user = user;
  next();
}

module.exports = { restrictToLoggedInUser, checkAuth };
