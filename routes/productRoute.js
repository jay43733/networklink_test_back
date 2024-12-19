const express = require("express");
const { getAllProduct } = require("../controllers/productController");
const productRoute = express.Router();

productRoute.get("/", getAllProduct);

module.exports = productRoute;
