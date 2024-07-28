const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Order = require("../Models/orders");
const product = require("../Models/product");

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

// router.post("/", (req, res, next) => {
//   const order = {
//     productId: req.body.productId,
//     quantity: req.body.quantity,
//   };
//   res.status(200).json({
//     message: "order Created",
//     id: orderId,
//   });
// });

router.post("/", (req, res, next) => {
  const order = new Order({
    _id: new mongoose.Types.ObjectId(),
    quantity: req.body.quantity,
    product: req.body.productId,
  });
  order
    .save()
    .then((result) => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

router.post("/", (req, res, next) => {
  res.status(201).json({
    message: "order were posted to server",
  });
});

module.exports = router;
