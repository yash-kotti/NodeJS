// For mapping to the users.

// const userToSessionIdMap = new Map();
const jwt = require("jsonwebtoken");
const secret = "YashKotti@1233";
function setUser(user) {
  // userToSessionIdMap.set(id, user);
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
      role: user.role,
    },
    secret
  );
}
function getUser(token) {
  // console.log("User map get", userToSessionIdMap);
  // return userToSessionIdMap.get(id);
  if (!token) return null;
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    console.log("Error ", error);
    return null;
  }
}
// console.log("User map", userToSessionIdMap);

module.exports = { setUser, getUser };
