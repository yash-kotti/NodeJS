const { getUser } = require("../service/auth");

async function restrictToLoggedInUser(req, res, next) {
  // console.log("Request object", req);
  const userUid = req.cookies.uid;
  console.log("User ID", userUid);
  if (!userUid) return res.redirect("/login");
  const user = getUser(userUid);
  console.log("USER", user);
  if (!user) return res.redirect("/login");
  req.user = user;
  next();
}

async function checkAuth(req, res, next) {
  // console.log("Request object", req);
  const userUid = req.cookies.uid;
  const user = getUser(userUid);
  // console.log("USER Check Auth" + user);
  req.user = user;
  next();
}

module.exports = { restrictToLoggedInUser, checkAuth };
