const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Product = require("../Models/product");
const multer = require("multer");
const checkAuth = require("../middleware/check-auth");
const upload = multer({
  dest: "C:/Users/Shahzaib Shafiq/Downloads/express/uploads",
});

// router.get("/", (req, res, next) => {
//   res.status(200).json({
//     message: "Handling GET Requests to /products",
//   });
// });

//api to post data to DB

router.post("/", upload.single("productImage"), checkAuth, (req, res, next) => {
  console.log(req.file);

  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price,
    productImage: req.file ? req.file.path : undefined,
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
      console.log("error");
      res.status(500).json({
        error: err.message,
      });
    });
});

//api to get data from DB using ID

router.get("/:productId", (req, res, next) => {
  const productId = req.params.productId;
  Product.findById(productId)
    .select("name price _id productImage")
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

  if (Object.keys(updateOps).length === 0) {
    return res.status(400).json({ message: "No update fields provided" });
  }

  Product.updateOne({ _id: productId }, { $set: updateOps })
    .exec()
    .then((result) => {
      console.log("Update result:", result); // Log result for debugging

      if (result.matchedCount === 0) {
        return res.status(404).json({ message: "Product not found" });
      }
      if (result.modifiedCount > 0) {
        return res
          .status(200)
          .json({ message: "Product updated successfully" });
      }
      res.status(304).json({ message: "No changes applied" });
    })
    .catch((err) => {
      console.log("Error:", err); // Log error for debugging
      res.status(500).json({ error: err.message });
    });
});

// router.patch("/:productId", (req, res, next) => {
//   const productId = req.params.productId;
//   const updateOps = {};

//   // Assuming req.body is an array of operations, e.g., [{ propName: 'name', value: 'New Name' }, { propName: 'price', value: 20 }]
//   for (const ops of req.body) {
//     updateOps[ops.propName] = ops.value;
//   }

//   Product.updateOne({ _id: productId }, { $set: updateOps })
//     .exec()
//     .then((result) => {
//       if (result.nModified > 0) {
//         res.status(200).json({ message: "Product updated successfully" });
//       } else {
//         res
//           .status(404)
//           .json({ message: "Product not found or no change applied" });
//       }
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json({ error: err.message });
//     });
// });

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
