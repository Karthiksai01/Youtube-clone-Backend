import express from "express";
import { addComment,getCommentByVideoID } from "../controllers/commentController.js";
import { auth } from "../middleware/authentication.js";

const router =express.Router();

router.post('/comment',auth,addComment);
router.get('/comment/:videoID',getCommentByVideoID);

export default router