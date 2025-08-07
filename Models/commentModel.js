import mongoose, { Schema } from "mongoose";

const commentSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    video: {
      type: Schema.Types.ObjectId,
      ref: "Video",
      required: true,
    },

    message: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, 
  }
);

const Comment = mongoose.model("Comment", commentSchema);
export default Comment;
