const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.status(200).json({
    message: "order were fetched from server",
  });
});

// router.get("/", (req, res, next) => {
//   res.status(200).json({
//     message: "order were fetched from server",
//   });
// });

router.get("/:orderId", (req, res, next) => {
  const orderId = req.params.orderId;
  res.status(200).json({
    message: "order Details with specific ID",
    id: orderId,
  });
});

router.get("/:orderId", (req, res, next) => {
  const orderId = req.params.orderId;
  res.status(200).json({
    message: "order Deleted with specific ID",
    id: orderId,
  });
});

router.post("/", (req, res, next) => {
  res.status(201).json({
    message: "order were posted to server",
  });
});

module.exports = router;
