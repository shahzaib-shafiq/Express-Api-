const express = require("express");

const router = express.Router();

router.get("/", (req, res, next) => {
  res.status(200).json({
    message: "Handling GET Requests to /products",
  });
});

router.post("/", (req, res, next) => {
  res.status(200).json({
    message: "Handling POST Requests to /products",
  });
});

router.get("/:productId", (req, res, next) => {
  const id = req.params.productId;

  if (id === "special") {
    res.status(200).json({
      message: "Special ID",
    });
  } else {
    res.status(200).json({
      message: "Normal ID",
    });
  }
});

module.exports = router;
