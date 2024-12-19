const prisma = require("../config/prisma");
const createError = require("../utils/createError");

exports.getCartByUserId = async (req, res, next) => {
  try {
    const { id } = req.user;
    const cartsByUserId = await prisma.carts.findMany({
      where: {
        userId: id,
      },
      include: {
        product: true,
      },
    });
    res.status(200).json(cartsByUserId);
  } catch (err) {
    next(err);
    console.log(err);
  }
};

exports.createCart = async (req, res, next) => {
  try {
    const { productId, amount, sweetness } = req.body;
    const { id } = req.user;
    
    // Check if productId and Sweetness from req.body are existed
    const isProductOrdered = await prisma.carts.findFirst({
      where: {
        AND: [
          { productId: productId },
          { sweetness: sweetness },
          { userId: id },
        ],
      },
    });


    if (isProductOrdered) {
      const updatedAmount = await prisma.carts.update({
        where: {
          id: isProductOrdered.id,
        },
        data: {
          amount: isProductOrdered.amount + amount,
        },
        include: {
          product: true,
        },
      });
      return res.status(200).json(updatedAmount);
    }

    const newCart = await prisma.carts.create({
      data: {
        amount,
        sweetness,
        productId,
        userId: id,
      },
      include: {
        product: true,
      },
    });
    res.status(200).json(newCart);
  } catch (err) {
    next(err);
    console.log(err);
  }
};

exports.deleteCart = async (req, res, next) => {
  try {
    const { cartId } = req.params;

    // Check if the cart item exists
    const cartItem = await prisma.carts.findUnique({
      where: {
        id: +cartId,
      },
    });

    if (!cartItem) {
      return res.status(404).json({ error: "Cart item not found" });
    }

    const removeCart = await prisma.carts.delete({
      where: {
        id: +cartId,
      },
    });
    res.status(200).json(removeCart);
  } catch (err) {
    next(err);
    console.log(err);
  }
};
