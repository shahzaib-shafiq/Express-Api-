// const express = require("express");
// const mongoose = require("mongoose");
// const router = express.Router();
// const Product = require("../Models/product");
// router.get("/", (req, res, next) => {
//   res.status(200).json({
//     message: "Handling GET Requests to /products",
//   });
// });

// // router.post("/", (req, res, next) => {
// //   res.status(200).json({
// //     message: "Handling POST Requests to /products",
// //   });
// // });

// router.post("/", (req, res, next) => {
//   // const product = {
//   //   name: req.body.name,
//   //   price: req.body.price,
//   // };

//   const product = new Product({
//     _id: new mongoose.Types.ObjectId(),
//     name: req.body.name,
//     price: req.body.price,
//   });

//   product
//     .save()
//     .then((result) => {
//       console.log(result);
//     })
//     .catch((err) => {
//       console.log(err);
//     });

// const product = new Product({
//   _id: new mongoose.Types.ObjectId(),
//   name: req.body.name,
//   price: req.body.price,
// });
// product.save().then(result=>{
//   console.log(result);
// }).;
// .catch(err=>{
//   console.log(err)
// })

//console.log(product.name, product.price);
//  res.status(201).json({
//    message: "Received The POST Request  ",
//   createdProduct: product,
// });
// });
const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Product = require("../Models/product");

router.get("/", (req, res, next) => {
  res.status(200).json({
    message: "Handling GET Requests to /products",
  });
});

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
