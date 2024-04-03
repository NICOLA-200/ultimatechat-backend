import MessageModel from "../model/Message.js";
import streamifier from "streamifier"
import cloudinary from 'cloudinary'
import NotificationModel from "../model/Notification.js";


export const addMessage = async (req, res) => {
  const { receiverId, sendId, message, time ,seen } = req.body;


  
   if (req.file) {
    let cld_upload_stream = cloudinary.v2.uploader.upload_stream(
      {
        folder: "messagePhotos"
      },
      async function(error, result) {
         const urlPhoto  =  result?.url
         
        await NotificationModel.findOneAndUpdate(
          { owner: receiverId },
          { $inc: { notNumber: 1 } }
        );
        

        if (result?.url){
      
         const result2 = new MessageModel({
          receiverId,
          sendId,
          message:result.url,
          time,
          seen
        });
      
     
     
      try {
        let result = await result2.save();
        result = {
           receiverId: result.receiverId,
           sendId: result.sendId,
           message : result.message,
           time: result.time,
           seen: result.seen
        }
        res.status(200).json(result);
      } catch (error) {
      console.log(error)
      }
    }
      })
      streamifier.createReadStream(req.file.buffer).pipe(cld_upload_stream);

      return

     
   }
   if (seen == false ) {
    await NotificationModel.findOneAndUpdate(
      { owner: receiverId },
      { $inc: { notNumber: 1 } }
    );
   }

  const newMessage = new MessageModel({
    receiverId,
    sendId,
    message,
    time,
    seen
  });
  try {
    const result = await newMessage.save();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getMessages = async (req, res) => {

  const { sendId , receiverId } = req.params;
  try {
    const result = await MessageModel.find({
      $or: [
          { sendId, receiverId },
          { sendId: receiverId, receiverId: sendId }
      ]
  }).sort({ timestamp: -1 });
  

    res.status(200).json(result );

  } catch (error) {
    res.status(500).json(error);
  }
};


