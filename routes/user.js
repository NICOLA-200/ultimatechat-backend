import express from "express"
import  { getUser , getUsers, updateUser , getCurrentUser,Friend  , FriendRequest , FriendConfirm , UnRequestFriend } from "../controller/user.js"
import  { verifyToken } from "../utils/verifyToken.js";
import multer from 'multer'

const     router = express.Router();

const storage =multer.memoryStorage();
const upload = multer({storage: storage})
router.get("/currentUser",verifyToken ,getCurrentUser);

router.put("/:c",upload.single("avatar") ,updateUser);
router.get("/", verifyToken,getUsers);
router.post("/friendRequest", verifyToken, FriendRequest)
router.post("/FriendConfirm", verifyToken, FriendConfirm)
router.post("/UnRequestFriend", verifyToken, UnRequestFriend)
router.get("/friends",verifyToken ,Friend)
router.get("/user/:id", getUser)


export default router;