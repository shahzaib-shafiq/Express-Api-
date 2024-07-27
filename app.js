const express = require("express");
const app = express();
const port = 3000;

const productRoutes = require("./api/Routes/Products");

app.use("/products", productRoutes);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
