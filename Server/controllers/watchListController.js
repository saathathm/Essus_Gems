import WatchList from "../models/WatchList.js";
import { createError } from "../utils/error.js";

export const addToWatchList = async (req, res, next) => {
  try {
    const productId = req.params.id;
    const userId = req.user.id;
    let watchList = await WatchList.findOne({ userId });

    if (!watchList) {
      watchList = new WatchList({ userId, products: [productId] });
    } else {
      if (!watchList.products.includes(productId)) {
        watchList.products.push(productId);
      }
    }
    await watchList.save();
    res
      .status(200)
      .json({ status: 200, message: "Added to watch list!", watchList });
  } catch (error) {
    next(error);
  }
};

export const removeFromWatchList = async (req, res, next) => {
  try {
    const productId = req.params.id;
    const userId = req.user.id;

    const watchList = await WatchList.findOne({ userId });

    if (!watchList) {
      return next(createError(404, "Watch list not found"));
    }

    watchList.products = watchList.products.filter(
      (product) => product.toString() !== productId
    );

    await watchList.save();
    res
      .status(200)
      .json({ status: 200, message: "Removed from watch list!", watchList });
  } catch (error) {
    next(error);
  }
};

export const getWatchList = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const watchList = await WatchList.findOne({ userId }).populate("products");
    if (!watchList) {
      return next(createError(404, "Watch list not found!"));
    }
    res.status(200).json({ status: 200, watchList });
  } catch (error) {
    next(error);
  }
};
