const jwt = require("jsonwebtoken");
const secret = "SuperMan@123";
function generateTokenForUser(user) {
  const payload = {
    _id: user._id,
    fullname: user.fullname,
    email: user.email,
    profileImageURL: user.profileImageURL,
    role: user.role,
  };
  const token = jwt.sign(payload, secret);
  return token;
}
function validateToken(token) {
  const payload = jwt.verify(token, secret);
  return payload;
}

module.exports = { generateTokenForUser, validateToken };
