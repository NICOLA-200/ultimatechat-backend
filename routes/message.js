import express from 'express';
import { addMessage, getMessages } from '../controller/message.js';
import { getNotification ,clearNotification } from '../controller/notification.js';
import multer from 'multer'
import { verifyToken } from '../utils/verifyToken.js';


const router = express.Router();

const storage =multer.memoryStorage();
const upload = multer({storage: storage})

router.post('/',upload.single("avatar") , addMessage);

router.get('/:sendId/:receiverId', getMessages);
router.get("/notification",verifyToken, getNotification)
router.get("/notificationClear",verifyToken, clearNotification)

export default router