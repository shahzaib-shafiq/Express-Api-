const mongoose = require("mongoose");
const Product = require("../Models/product");

exports.products_get_all = (req, res, next) => {
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
};

exports.products_create_product = (req, res, next) => {
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
};

exports.products_get_product = (req, res, next) => {
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
};

exports.products_update_product = (req, res, next) => {
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
};

exports.products_delete = (req, res, next) => {
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
};
