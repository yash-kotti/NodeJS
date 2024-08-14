const { validateToken } = require("../services/authentication");

function checkForAuthenticationCookie(cookieName) {
  return (req, res, next) => {
    const tokenCookieValue = req.cookies[cookieName];
    // console.log("Token : ", tokenCookieValue);
    if (!tokenCookieValue) return next();
    try {
      const userPayload = validateToken(tokenCookieValue);
      // console.log("User value:", userPayload);
      req.user = userPayload;
    } catch (error) {}
    return next();
  };
}

module.exports = { checkForAuthenticationCookie };
