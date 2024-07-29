const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  console.log(req.headers);
  console.log(process.env.JWT_KEY);
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, "secret");
    req.userData = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Auth failed",
    });
  }
};

// // const jwt = require("jsonwebtoken");
// // module.exports = (req, res, next) => {
// //   try {
// //     const decoded = jwt.verify(req.body.token, "secret");
// //     next();
// //     req.userData = decoded;
// //   } catch (error) {
// //     return res.status(500).json({
// //       message: "Auth Failed",
// //       error: error,
// //     });
// //   }
// // };
// ///////////////////////////////////

// // const jwt = require("jsonwebtoken");

// // module.exports = (req, res, next) => {
// //   try {
// //     const token = req.headers.authorization.split(" ")[1]; // "Bearer TOKEN"
// //     const decoded = jwt.verify(token, "secret");
// //     req.userData = decoded;
// //     next();
// //   } catch (error) {
// //     return res.status(401).json({
// //       message: "Auth Failed",
// //       error: error.message,
// //     });
// //   }
// // };

// //////////////////////////////////////

// const jwt = require("jsonwebtoken");

// module.exports = (req, res, next) => {
//   console.log(req.headers);
//   try {
//     // Check if the Authorization header is present
//     if (!req.headers.authorization) {
//       return res.status(401).json({
//         message: "Authorization header missing",
//       });
//     }

//     // Split the Authorization header to get the token
//     const authHeader = req.headers.authorization;
//     const token = authHeader.split(" ")[1]; // "Bearer TOKEN"

//     // Check if the token exists after splitting
//     if (!token) {
//       return res.status(401).json({
//         message: "Token missing or malformed",
//       });
//     }

//     // Verify the token
//     const decoded = jwt.verify(token, "secret");
//     req.userData = decoded;
//     next();
//   } catch (error) {
//     // Return the error message with status 401
//     return res.status(401).json({
//       message: "Auth Failed",
//       error: error.message,
//     });
//   }
// };
