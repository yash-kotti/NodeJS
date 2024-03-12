const { getUser } = require("../service/auth");

function checkForAuthentication(req, res, next) {
  req.user = null;
  // console.log("Request ", req);
  const cookieValue = req.cookies?.token;
  // console.log("Cookie Value " + cookieValue);
  if (!cookieValue) return next();
  // const token = cookieValue.split("Bearer ")[1];
  // console.log("Token Check : " + token);
  req.user = getUser(cookieValue);
  console.log("Check " + req.user);
  next();
}

// For Autorizing the user if it is authorize to access this page.
function restrictTo(roles) {
  return function (req, res, next) {
    if (!req.user) res.redirect("/login");
    console.log("USER " + req.user);
    if (!roles.includes(req.user.role)) res.end("UnAuthorized");
    return next();
  };
}

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
  console.log("USer ID " + userUid);
  if (!userUid) return res.redirect("/login");
  console.log("UserUID " + userUid);
  const token = userUid.split("Bearer ")[1];
  const user = getUser(token);
  // console.log("USER Check Auth" + user);
  req.user = user;
  next();
}

module.exports = {
  restrictToLoggedInUser,
  checkAuth,
  checkForAuthentication,
  restrictTo,
};
