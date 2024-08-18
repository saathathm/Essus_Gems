import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { createError } from "../utils/error.js";

export const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    let avatar;
    let BASE_URL = process.env.BACKEND_URL;

    if (req.file) {
      avatar = `${BASE_URL}/uploads/user/${req.file.filename}`;
    }

    const newUser = User.create({
      name: req.body.name,
      phoneNumber: req.body.phoneNumber,
      email: req.body.email,
      location: { city: req.body.city, area: req.body.area },
      password: hash,
      avatar,
    });
    (await newUser).save;
    res.status(200).json("User has been created");
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return next(createError(404, "User not found!"));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect) {
      return next(createError(400, "Password is incorrect"));
    }

    const token = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT
    );

    const { password, isAdmin, ...others } = user._doc;

    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json({ status: 200, ...others });
  } catch (error) {
    next(error);
  }
};

export const logout = (req, res, next) => {
  try {
    res
      .cookie("access_token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
      })
      .status(200)
      .json("Logged out success!");
  } catch (error) {
    next(error);
  }
};
