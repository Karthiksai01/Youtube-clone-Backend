import express from 'express';
import { uploadVideo,getAllVideos, getVideoById,getAllVideosByUserID} from '../controllers/videoController.js';
import { auth } from '../middleware/authentication.js';
const router=express.Router();


router.post('/video',auth,uploadVideo);
router.get('/allvideos',getAllVideos);
router.get('/getVideoById/:id',getVideoById);
router.get('/:userId/channel',getAllVideosByUserID)

export default router;