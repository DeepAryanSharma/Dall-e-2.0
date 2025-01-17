import express from "express";
import * as dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

import Post from "../mongodb/models/post.js";

dotenv.config(); //to make sure that our environment variables are indeed getting populated

//creating new instance of router
const router = express.Router();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//TO GET ALL POSTS
router.route("/").get(async (req, res) => {
  try {
    const posts = await Post.find({});

    res.status(201).json({ success: true, data: posts });
  } catch (error) {
    res.status(500).json({ success: true, message: error });
  }
});

//TO CREATE A POST
router.route("/").post(async (req, res) => {
  try {
    //to get and strore info from frontend
    const { name, prompt, photo } = req.body;
    const photoUrl = await cloudinary.uploader.upload(photo);

    //creating new post
    const newPost = await Post.create({
      name,
      prompt,
      photo: photoUrl.url,
    });

    res.status(201).json({ success: true, data: newPost });
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
});

export default router;
