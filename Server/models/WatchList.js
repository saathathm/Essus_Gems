import mongoose from "mongoose";

const watchListSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Gem",
        required: true,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("WatchList", watchListSchema);
