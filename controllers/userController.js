const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const prisma = require("../config/prisma");
const createError = require("../utils/createError");
require("dotenv").config();

exports.register = async (req, res, next) => {
  try {
    const { email, password, confirmPassword } = req.input;
    const isUserExist = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (isUserExist) {
      return createError(400, "Email is already used");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });
    res.status(200).json(newUser);
  } catch (err) {
    next(err);
    console.log(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.input;
    const isUserSignUp = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!isUserSignUp) {
      return createError(400, "Account Invalid");
    }

    const isPasswordMatch = await bcrypt.compare(
      password,
      isUserSignUp.password
    );

    if (!isPasswordMatch) {
      return createError(400, "Account Invalid");
    }

    const payload = {
      id: isUserSignUp.id,
      email: isUserSignUp.email,
    };

    const secret = process.env.SECRET_KEY;
    const token = jwt.sign(payload, secret, {
      expiresIn: "30d",
    });

    res.status(200).json({ user: payload, accessToken: token });
  } catch (err) {
    next(err);
    console.log(err);
  }
};

exports.getMe = async (req, res, next) => {
  try {
    const { id } = req.user;
    const result = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    res.status(200).json(result);
  } catch (err) {
    next(err);
    console.log(err);
  }
};
