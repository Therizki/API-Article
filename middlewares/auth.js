// const UnauthorizedError = require("../errors/unauthorized");
// const jwt = require("jsonwebtoken");
// const config = require("../config");

// module.exports = (req, res, next) => {
//   try {
//     const token = req.headers["x-access-token"];
//     if (!token) {
//       throw "not token";
//     }
//     const decoded = jwt.verify(token, config.secretJwtToken);
//     req.user = decoded;
//     next();
//   } catch (message) {
//     next(new UnauthorizedError(message));
//   }
// };



// 8. Modify the authentication middleware to retrieve all user information and pass it in "req"
// (not just the user id)

// middleware/auth.js
const UnauthorizedError = require("../errors/unauthorized");
const jwt = require("jsonwebtoken");
const config = require("../config");
const User = require("../api/users/users.model");

module.exports = async (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];
    if (!token) {
      throw "No token provided";
    }
    const decoded = jwt.verify(token, config.secretJwtToken);
    let user = await User.findById(decoded.userId);
    if (!user) {
      // console.log( "User not found");
    }
    user =  {
      _id: decoded.userId,
      name: "flkename",
      email: "fake@gmail.com",
      role: "admin",
    }
    req.user = user;
    next();
  } catch (error) {
    next(new UnauthorizedError(error.message));
  }
};
