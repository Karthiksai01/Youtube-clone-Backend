import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // ✅ Must match the model name from userModel.js
    required: true
  },
  title: { type: String, required: true },
  description: String,
  videoLink: { type: String, required: true },
  videoType: String,
  thumbnail: { type: String, required: true },
  like: { type: Number, default: 0 },
  dislike: { type: Number, default: 0 }
}, { timestamps: true });

const Video = mongoose.model("Video", videoSchema);
export default Video;
