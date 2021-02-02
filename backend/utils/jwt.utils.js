// Imports
const jwt = require("jsonwebtoken");
const jwtSignSecret =
  "p0dRzyWZRpVNkWzmFzqyNVV9hfOY3O8iatgdrf4685juhyge6957jh5g324jygtfe45";
// Exported functions
module.exports = {
  generateTokenForUser: (userData) => {
    return jwt.sign(
      {
        userId: userData.id,
        isAdmin: userData.isAdmin,
      },
      jwtSignSecret,
      {
        expiresIn: "1h",
      }
    );
  },
};
