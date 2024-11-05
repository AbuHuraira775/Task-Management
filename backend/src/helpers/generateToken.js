const jwt = require("jsonwebtoken");
const dotenv = require('dotenv')
dotenv.config()

//use user id to generate token
const generateToken = (id) => {
  // token must be returned to the client
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = generateToken;