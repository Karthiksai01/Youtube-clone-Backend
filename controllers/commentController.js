import Comment from '../Models/commentModel.js';

// Add new comment
export const addComment = async (req, res) => {
  try {
    console.log('req.body',req.body);
    const userId = req.user._id;
    const { video, message } = req.body; // or use videoId if you prefer

    const newComment = new Comment({ user: userId, video, message });
    const savedComment = await newComment.save();

    res.status(201).json({ message: 'Success', comment: savedComment });
  } catch (error) {
    console.error("Error adding comment:", error.message);
    res.status(500).json({ error: 'Server Error' });
  }
};

// Get all comments by video ID
export const getCommentByVideoID = async (req, res) => {
  try {
    const { videoID } = req.params;

    const comments = await Comment.find({ video: videoID }).populate(
      'user',
      'channelName profilePic userName createdAt' 
    );

    res.status(200).json({ message: 'Success', comments });
  } catch (error) {
    console.error("Error fetching comments:", error.message);
    res.status(500).json({ error: 'Server Error' });
  }
}
