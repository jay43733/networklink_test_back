const express = require("express");
const { createOrder, getOrderItemsById, getAllOrder } = require("../controllers/orderController");
const orderRoute = express.Router();

orderRoute.get("/", getAllOrder);
orderRoute.get("/:orderId", getOrderItemsById);
orderRoute.post("/", createOrder);

module.exports = orderRoute;
