const mongoose = require("mongoose");

const Order = require("../Models/orders");
const Product = require("../Models/product");

exports.orders_get_all = (req, res, next) => {
  Order.find()
    .select("product quantity _id")
    .populate("product", "name") // Ensure that the 'product' field is correctly referenced
    .exec()
    .then((docs) => {
      res.status(200).json({
        count: docs.length,
        orders: docs.map((doc) => {
          return {
            _id: doc._id,
            product: doc.product.name, // Access the populated field correctly
            quantity: doc.quantity,
            request: {
              type: "GET",
              url: "http://localhost:3000/orders/" + doc._id,
            },
          };
        }),
      });
    })
    .catch((err) => {
      console.error(err); // Log the error for debugging
      res.status(500).json({ error: err.message }); // Use a 500 status code for server errors
    });
};

exports.orders_create_order = (req, res, next) => {
  // Check if the product ID exists in the request body
  if (!req.body.productId) {
    return res.status(400).json({
      message: "Product ID is required",
    });
  }

  // Find the product by its ID
  product
    .findById(req.body.productId)
    .then((product) => {
      // If product not found, return 404
      if (!product) {
        return res.status(404).json({
          message: "Product not found",
        });
      }

      // Create a new order
      const order = new Order({
        _id: new mongoose.Types.ObjectId(),
        quantity: req.body.quantity,
        product: req.body.productId,
      });

      // Save the new order
      return order.save();
    })
    .then((result) => {
      // Send a response with the created order
      res.status(201).json({
        message: "Order Created",
        createdOrder: {
          _id: result._id,
          product: result.product,
          quantity: result.quantity,
        },
        request: {
          type: "GET",
          url: "http://localhost:3000/orders/" + result._id,
        },
      });
    })
    .catch((err) => {
      // Handle errors
      console.error(err);
      res.status(500).json({
        error: err.message,
      });
    });
};

exports.orders_get_order = (req, res, next) => {
  Order.findById(req.params.orderId)
    .populate("product", "name")
    .exec()
    .then((order) => {
      if (!order) {
        return res.status(404).json({
          message: "order not found",
        });
      }
      res.status(200).json({
        order: order,
        request: {
          type: "GET",
          url: "http://localhost:3000/orders",
        },
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

exports.orders_delete_order = (req, res, next) => {
  Order.deleteOne({ _id: req.params.orderId })
    .exec()
    .then((result) => {
      if (result.deletedCount === 0) {
        // Handle the case where no document was deleted
        return res.status(404).json({
          message: "Order not found",
        });
      }

      res.status(200).json({
        message: "Order Deleted",
        request: {
          type: "POST",
          url: "http://localhost:3000/orders",
          body: {
            productId: "ID", // This is a placeholder. You might want to use the actual schema definition here.
            quantity: "Number", // Same here; use the actual schema definition.
          },
        },
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({
        error: err.message, // Use err.message for a clearer error message
      });
    });
};
