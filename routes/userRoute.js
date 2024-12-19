const express = require("express");
const { loginValidate, registerValidate } = require("../middlewares/validator");
const { register, login, getMe } = require("../controllers/userController");
const authenticate = require("../middlewares/authenticate");

const userRoute = express.Router();
userRoute.post("/login", loginValidate, login);
userRoute.post("/register", registerValidate, register);
userRoute.get("/me", authenticate, getMe);

module.exports = userRoute;
