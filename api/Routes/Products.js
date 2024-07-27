const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Product = require("../Models/product");

// router.get("/", (req, res, next) => {
//   res.status(200).json({
//     message: "Handling GET Requests to /products",
//   });
// });

//api to post data to DB
router.post("/", (req, res, next) => {
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price,
  });

  product
    .save()
    .then((result) => {
      res.status(201).json({
        message: "Product created successfully",
        createdProduct: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err.message,
      });
    });
});

//api to get data from DB using ID

router.get("/:productId", (req, res, next) => {
  const productId = req.params.productId;
  Product.findById(productId)
    .exec()
    .then((doc) => {
      console.log(doc);
      res.status(200).json({
        message: "Handling Get Requests to /products",
        doc,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

//api to get all data from DB

router.get("/", (req, res, next) => {
  const productId = req.params.productId;
  Product.find()
    .exec()
    .then((doc) => {
      console.log(doc);
      res.status(200).json({
        message: "Handling Get Requests to /products",
        doc,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
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

  Product.deleteOne({ _id: productId })
    .exec()
    .then((result) => {
      if (result.deletedCount > 0) {
        res.status(200).json({ message: "Product deleted successfully" });
      } else {
        res.status(404).json({ message: "Product not found" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err.message });
    });
});

// router.delete("/:productId", (req, res, next) => {
//   const productId = req.params.productId;
//   res.status(200).json({
//     message: "Handling Delete Requests to /products",
//   });
// });

router.put("/:productId", (req, res, next) => {
  const productId = req.params.productId;
  res.status(200).json({
    message: "Handling PUT Requests to /products",
  });
});

router.patch("/:productId", (req, res, next) => {
  const productId = req.params.productId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Product.update(
    {
      _id: productId,
    },
    {
      $set: updateOps,
    }
    // {
    //   $set: { name: req.body.newName, price: req.body.newPrice },
    // }
  )
    .exec()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

// router.patch("/:productId", (req, res, next) => {
//   const productId = req.params.productId;
//   res.status(200).json({
//     message: "Handling PATCH Requests to /products",
//     id: productId,
//   });
// });

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
