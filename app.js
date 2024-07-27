const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const app = express();

const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers,Origin,X-requested-With,Content-Type,Accept,Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT,POST,PATCH,DELETE,GET");
    res.status(200).json({});
  }
});
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
