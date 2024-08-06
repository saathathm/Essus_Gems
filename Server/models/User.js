import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your name"],
      unique: true,
    },
    phoneNumber: {
      type: String,
      required: [true, "Please enter your phone number"],
    },
    email: {
      type: String,
      required: [true, "Please enter your email"],
      unique: true,
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
    password: {
      type: String,
      required: [true, "Please enter your password"],
    },
    avatar: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
