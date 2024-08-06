import mongoose from "mongoose";

const GemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: [true, "Please enter gem type"],
      enum: {
        values: [
          "Sapphire",
          "Ruby",
          "Diamond",
          "Emerald",
          "Amethyst",
          "Topaz",
          "Opal",
          "Turquoise",
          "Garnet",
          "Aquamarine",
          "Pearl",
          "Peridot",
          "Citrine",
          "Onyx",
          "Jade",
          "Tourmaline",
          "Spinel",
          "Zircon",
          "Tanzanite",
          "Alexandrite",
          "Morganite",
          "Lapis Lazuli",
          "Chrysoberyl",
          "Moonstone",
          "Sunstone",
          "Malachite",
          "Coral",
          "Amber",
        ],
        message: "Please select correct gem type",
      },
    },
    color: {
      type: String,
      required: true,
    },
    shape: {
      type: String,
      required: true,
    },
    carat: {
      type: Number,
      required: true,
    },
    treatment: {
      type: String,
    },
    origin: {
      type: String,
      required: true,
    },
    certificate: {
      type: String,
    },
    clarity: {
      type: String,
    },
    hardness: {
      type: Number,
    },
    luster: {
      type: String,
    },
    dimension: {
      type: String,
    },
    pieces: {
      type: Number,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    location: {
      city: {
        type: String,
        required: [true, "Please select your city"],
      },
      area: {
        type: String,
        required: [true, "Please select your area"],
      },
    },
    medias: [
      {
        media: {
          type: String,
          required: true,
        },
      },
    ],
    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Gem", GemSchema);
