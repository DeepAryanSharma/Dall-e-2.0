import mongoose from "mongoose";

const Post = new mongoose.Schema({
  name: { type: String, required: true },
  prompt: { type: String, required: true },
  photo: { type: String, required: true },
});

//creating a model out of the schema we created above
const PostSchema = mongoose.model("Post", Post);

export default PostSchema;
