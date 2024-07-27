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
  const productId = req.params.productId;
  res.status(200).json({
    message: "Handling Get Requests to /products",
    id: productId,
  });
});

router.delete("/:productId", (req, res, next) => {
  const productId = req.params.productId;
  res.status(200).json({
    message: "Handling Delete Requests to /products",
  });
});

router.put("/:productId", (req, res, next) => {
  const productId = req.params.productId;
  res.status(200).json({
    message: "Handling PUT Requests to /products",
  });
});

router.patch("/:productId", (req, res, next) => {
  const productId = req.params.productId;
  res.status(200).json({
    message: "Handling PATCH Requests to /products",
    id: productId,
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
