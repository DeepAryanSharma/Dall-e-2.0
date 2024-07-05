import mongoose from "mongoose";

const connectDB = (url) => {
  mongoose.set("strictQuery", true); //this option will be usefull when working wtith the search functionality

  //connecting our database
  mongoose
    .connect(url)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log(err));
};

export default connectDB;
