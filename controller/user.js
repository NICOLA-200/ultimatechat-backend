import User from "../model/User.js"
import { createError } from "../utils/error.js";
import streamifier from "streamifier"
import cloudinary from 'cloudinary'
import NotificationModel from "../model/notification.js";

export const getUser = async (req,res,next)=>{
     try {
       const user = await User.findById(req.params.id).select([
        '-password', 
        '-__v',])
  
  
      // const friendsNumber = user.
       res.status(200).json({...user, friendsNumber: user.friends.length});
     } catch (err) {
       next(err);
       res.send(err)
     }
   }

   export const getUsers = async (req, res, next) => {
    console.log(req.user.id)
    const myId = req.user.id;
    try {

      // Find all users excluding the current user
      const users = await User.find({ _id: { $ne: myId } }).select([
        "username",
        "_id",
        "profilePicture",
      ]);
  
      res.status(200).json(users);
    } catch (err) {
      next(err);
    }
  };

  export const updateUser = async (req,res,next)=>{

    let upUser;
    try {
  

      let cld_upload_stream = cloudinary.v2.uploader.upload_stream(
        {
          folder: "ultimateChat"
        },
        async function(error, result) {
           const urlPhoto  =  result?.url
           
    

          if (result.url){
        
           const updatedUser = await User.findByIdAndUpdate(
            req.params.c,
            { $set: { profilePicture: urlPhoto } },
            { new: true }

           
    
          );
          upUser = updatedUser
       
        }
  
        })
        res.status(200).json(upUser);


        streamifier.createReadStream(req.file?.buffer).pipe(cld_upload_stream);
      
    } catch (err) {
      next(err);
    }
  }

  export  const  getCurrentUser = async (req,res,next) => {
  try {
    const currentUser = await User.findById({_id: req.user.id}).select([
      '-password', 
      '-__v',
    
    ]);

   const data  = { ...currentUser, _id :req.user.id }
    
    if (!currentUser) return next(createError(404,"user not found"))

     
    res.status(200).send({...data._doc})
     
   
  }  catch (err) {
    console.log(err)
    res.status(500).send(err)
  }

  }

 export const FriendConfirm  =  async (req,res, next) => {
   const myId  = req.user.id
   const  hisId  =  req.body.id
   
   if (myId == hisId) {
       res.status(403).json("action forbidden")
        return
      }

   try {
     const confirm = await User.findByIdAndUpdate(myId,{$pull: { friendConfirm: hisId }})
     const request = await User.findByIdAndUpdate(hisId, {$pull: {friendRequest: myId }})


      await User.findByIdAndUpdate(myId,{$push: { friends: hisId }})
      await User.findByIdAndUpdate(hisId, {$push: {friends: myId }})
     res.status(200).send("ok")

   } catch(err) {
   console.log(err)

   }
 }

 export const FriendRequest  =  async (req,res, next) => {

   const myId  = req.user.id
   const  hisId  =  req.body.id
   
   if (myId == hisId) {
       res.status(403).json("action forbidden")
        return
      }

   try {
     const user = await User.findByIdAndUpdate(myId,{$push: { friendsRequest: hisId }})
     const friend = await User.findByIdAndUpdate(hisId, {$push: {friendConfirm: myId }})
     res.status(200).send("ok")

    
      await NotificationModel.findOneAndUpdate(
        { owner: hisId },
        { $inc: { notNumber: 1 } }
      );
     
   } catch(err) {
   console.log(err)

   }
 }

 export const UnRequestFriend =  async (req,res, next) => {
   const myId  = req.user.id
   const  hisId  =  req.body.id
   
   if (myId == hisId) {
       res.status(403).json("action forbidden")
        return
      }

   try {
     const user = await User.findByIdAndUpdate(myId,{$pull: { friendsRequest: hisId }})
     const friend = await User.findByIdAndUpdate(hisId, {$pull: {friendConfirm: myId }})
     res.status(200).send("ok")

   } catch(err) {
   console.log(err)

   }
 }


 export const Friend = async (req,res ,next) => {
   const myId = req.user.id

   try {
    const allUsers = await User.find({friends: myId}).select([
      "username",
      "_id",
      "profilePicture",
    ]);


    res.status(200).json(allUsers);

   } catch(err) {
    console.log(err)
    next(err)
   }
 }