import mongoose from "mongoose";

const connectDB = async () => {
  mongoose.set("strictQuery", false);

  try {
    const con = await mongoose.connect(process.env.MONGO, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB is connected to the host: ${con.connection.host}`);
  } catch (err) {
    console.error(`Error connecting to the database: ${err.message}`);
  }
};

export default connectDB;
