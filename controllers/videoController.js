import Video from "../Models/videoModel.js";

export const uploadVideo = async (req, res) => {
  try {
    const { title, description, videoLink, videoType, thumbnail } = req.body;

    const videoUpload = new Video({
      user: req.user._id,
      title,
      description,
      videoLink,
      videoType: videoType || "mp4",
      thumbnail,
    });

    await videoUpload.save();
    res.status(201).json({ success: true, videoUpload });
    
  } catch (error) {
    console.error(error); // important!
    res.status(500).json({ error: error.message || "server error" });
  }
};

export const getAllVideos = async (req, res) => {
  try {
    const videos = await Video.find().populate("user", "channelname userName profilePic createdAt");
    res.status(200).json(videos);
  } catch (error) {
    console.error("Error fetching videos:", error.message);
    res.status(500).json({ error: "Server error while fetching videos" });
  }
}
export const getVideoById=async(req,res)=>{
    try{
        let {id}=req.params;
        
        const videoById=await Video.findById(id).populate("user", "channelName userName profilePic createdAt");
        res.status(201).json({sucess:'true','VideoById':videoById});

    }catch (error) {
    console.error("Error fetching videos:", error.message);
    res.status(500).json({ error: "Server error while fetching videos" });
  }
}
export const getAllVideosByUserID=async(req,res)=>{
  try{
    let {userId}=req.params;
    console.log(userId)
    const videoByUser=await Video.find({user:userId}).populate("user", "channelName userName profilePic createdAt about");
    res.status(201).json({sucess:'true',"videoByUser":videoByUser})
  }catch (error){
    res.status(500).json({error:'server error'});
  }
}
export default uploadVideo;