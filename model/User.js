import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(

     {
          username: {
               type: String,
               required: true,
               unique: [true,"the username  is taken"]
          },

          password: {
               type: String,
               required: true,
               
          },
          email: {
          type: String,
          required: true,
          },
         fullname: {
          type: String,
               
         },
         slogan: {
          type:String,
         },
         profilePicture: {
          type: String,
         },
         friends:[],
         friendsRequest:[],
         friendConfirm:[]
          
     }
)

export default mongoose.model("User", UserSchema);