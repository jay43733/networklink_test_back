const express = require("express");
const { getOrderById, createOrder } = require("../controllers/orderController");
const orderRoute = express.Router();

orderRoute.get("/", getOrderById);
orderRoute.post("/", createOrder);

module.exports = orderRoute;
