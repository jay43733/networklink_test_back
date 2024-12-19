const express = require("express");
const { getCartByUserId, createCart, deleteCart } = require("../controllers/cartController");
const cartRoute = express.Router();

cartRoute.get("/", getCartByUserId);
cartRoute.post("/", createCart)
cartRoute.delete("/:cartId", deleteCart)

module.exports = cartRoute;
