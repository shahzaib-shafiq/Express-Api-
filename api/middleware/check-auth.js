const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {
  // Check if the Authorization header is present
  if (!req.headers.authorization) {
    return res.status(401).json({
      message: "No token provided",
    });
  }

  // Split the Authorization header to extract the token
  const authHeader = req.headers.authorization;
  // console.log("------- ");
  // console.log(process.env.JWT_KEY);

  //console.log(req.headers.authorization);

  const token = authHeader.split(" ")[1]; // Assumes "Bearer <token>"
  //console.log("token is: ", token);
  try {
    // Verify the token using the secret from environment variables
    const decoded = jwt.verify(token, process.env.JWT_KEY); // Use environment variable for secret key
    console.log(decoded);
    req.userData = decoded;
    next();
  } catch (error) {
    // Handle token verification errors
    return res.status(401).json({
      message: "Auth failed",
    });
  }
};
