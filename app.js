const express = require("express");
const app = express();
const port = 3000;

const productRoutes = require("./api/Routes/Products");
const ordersRoutes = require("./api/Routes/orders");

app.use("/products", productRoutes);

app.use("/orders", ordersRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
