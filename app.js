const express = require("express");
const app = express();
var morgan = require("morgan");

const port = 3000;

app.use(morgan("dev"));
const productRoutes = require("./api/Routes/Products");
const ordersRoutes = require("./api/Routes/orders");

app.use("/products", productRoutes);

app.use("/orders", ordersRoutes);

app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    message: error.message,
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
