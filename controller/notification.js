import MessageModel from "../model/Message.js";
import User from "../model/User.js"
import NotificationModel from "../model/Notification.js";


export const getNotification = async (req,res) => {
  

    //  console.log(req.user)
     const myId = req.user.id
     console.log("notifications ")
     

     try {
      

      const result = await MessageModel.find({
        receiverId: myId,
        seen: false
      }).sort({ timestamp: -1 });
      
      const promises = result.map(async (message) => {
        // Use await to wait for the user data to be fetched
        const data = await User.findById(message.sendId).select("username");
        let time = message.time
        return {...data._doc,time};
      });

      const arrayFriends = await Promise.all(promises);


      


        const user = await User.findById(myId).select("friendConfirm")

        const friendIds = user.friendConfirm

        const promises2 = friendIds.map(async (friend) => {
          // Use await to wait for the user data to be fetched
          const data = await User.findById(friend).select("username");
          
          return data._doc;
        });
        
        // Use Promise.all to wait for all promises to resolve
        const arrayFriends2 = await Promise.all(promises2);

      const notNumber = await NotificationModel.findOne({owner:myId})

        console.log(notNumber)
        
        res.status(200).json({mess: arrayFriends, confirm: arrayFriends2 , notNumber})
   
     } catch (err) {
     console.log(err)
   
     } 
   }

   export const clearNotification = async (req,res) => {
    const myId = req.user.id
      try {
     const numbbe =  await NotificationModel.findOneAndUpdate({owner: myId},{$set: {notNumber: 0}})
     console.log(numbbe)
      } catch(err) {
        console.log(err)
      }
   }

