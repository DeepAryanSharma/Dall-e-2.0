import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";

import connectDB from "./mongodb/connect.js";
import postRoutes from "./routes/postRoutes.js";
import dalleRoutes from "./routes/dalleRoutes.js";

dotenv.config(); //this line allows us to pool our environment variables from .env file

const app = express(); //initialising express app

//adding additional middlewares to it
app.use(cors());
app.use(express.json({ limit: "50mb" }));

//creating api endpoints that we can connect and hook onto from our frontend side
app.use("/api/v1/post", postRoutes);
app.use("/api/v1/dalle", dalleRoutes);

//creating first route
app.get("/", async (req, res) => {
  //this is to ensure that our application is running once we visit the URL of our server
  res.send("Hello from DALL-E!");
});

const startServer = async () => {
  try {
    //etablishing connnection with the database
    connectDB(process.env.MONGODB_URL);
    app.listen(8080, () =>
      console.log("Server has started on port http://localhost:8080")
    );
  } catch (error) {
    console.log(error);
  }
};

startServer();
