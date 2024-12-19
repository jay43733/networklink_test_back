const express = require("express");
const cors = require("cors");
const userRoute = require("./routes/userRoute");
const productRoute = require("./routes/productRoute");
require("dotenv").config();
const notFound = require("./middlewares/notFound");
const errorMiddleware = require("./middlewares/errorMiddleware");
const cartRoute = require("./routes/cartRoute");
const authenticate = require("./middlewares/authenticate");
const orderRoute = require("./routes/orderRoute");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/", userRoute);
app.use("/products", authenticate, productRoute);
app.use("/carts", authenticate, cartRoute);
app.use("/orders", authenticate,orderRoute)

app.use("*", notFound);
app.use(errorMiddleware);

const port = process.env.PORT || 8008;
app.listen(port, () => console.log(`Server runs on ${port}`));
