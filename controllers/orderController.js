const prisma = require("../config/prisma");

exports.getAllOrder = async (req, res, next) => {
  try {
    const { id } = req.user;
    const allOrder = await prisma.orders.findMany({
      where: {
        userId: id,
      },
    });
    res.status(200).json(allOrder);
  } catch (err) {
    next(err);
    console.log(err);
  }
};

exports.getOrderItemsById = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { orderId } = req.params;
    const allOrderItems = await prisma.orderItems.findMany({
      where: {
        userId: id,
        orderId: +orderId,
      },
      include: {
        product: true,
      },
    });
    res.status(200).json(allOrderItems);
  } catch (err) {
    next(err);
    console.log(err);
  }
};

exports.createOrder = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { totalPrice } = req.body;

    const userHasCart = await prisma.carts.findMany({
      where: {
        userId: id,
      },
      include: {
        product: true,
      },
    });

    if (userHasCart.length === 0) {
      return res.status(400).json({ message: "No items in the carts" });
    }

    const newOrder = await prisma.orders.create({
      data: {
        userId: id,
        totalPrice: totalPrice,
      },
    });

    const orderItemData = userHasCart.map((item) => ({
      amount: item.amount,
      sweetness: item.sweetness,
      productId: item.productId,
      userId: item.userId,
      orderId: newOrder.id,
    }));

    const createOrderItems = await prisma.orderItems.createMany({
      data: orderItemData,
    });

    await prisma.carts.deleteMany({
      where: {
        userId: id,
      },
    });
    res.status(201).json(newOrder, "order", createOrderItems, "item");
  } catch (err) {
    next(err);
    console.log(err);
  }
};
