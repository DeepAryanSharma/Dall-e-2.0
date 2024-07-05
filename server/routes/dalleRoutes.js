import express from "express";
import * as dotenv from "dotenv";
import { OpenAI } from "openai";

dotenv.config(); //to make sure that our environment variables are indeed getting populated

//creating new instance of router
const router = express.Router();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

//just for testing
router.route("/").get((req, res) => {
  res.send("Hello from DALL-E!");
});

router.route("/").post(async (req, res) => {
  try {
    //creating image for the requested prompt
    const { prompt } = req.body;

    // const aiResponse = await openai.createImage({
    //   prompt,
    //   n: 1,
    //   size: "1024x1024",
    //   response_format: "b64_json",
    // });

    // const image = aiResponse.data.data[0].b64_json;
    const aiResponse = await openai.images.generate({
      prompt: prompt,
      n: 1,
      size: "1024x1024",
      response_format: "b64_json",
    });
    const image = aiResponse.data[0].b64_json;

    res.status(200).json({ photo: image }); //This sets the HTTP status code of the response to 200. The status code 200 indicates that the request was successful and the server is returning the requested resource.
  } catch (error) {
    console.log(error);
    res.status(500).send(error?.response.data.error.message); //The status code 500 indicates an Internal Server Error, meaning something went wrong on the server side.
  }
});

export default router;
