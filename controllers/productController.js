const prisma = require("../config/prisma");
const createError = require("../utils/createError");

exports.getAllProduct = async (req, res, next) => {
  try {
    const result = await prisma.product.findMany({});
    res.status(200).json(result);
  } catch (err) {
    next(err);
    console.log(err);
  }
};
