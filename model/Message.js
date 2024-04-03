import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema(
  {
    receiverId: {
      type: String,
    },
    sendId: {
      type: String,
    },
    message: {
      type: String,
    },
    time: {
      type: String,
    },
    seen: {
      type: Boolean,
      default:true
    }
  },
  {
    timestamps: true,
  }
);

const MessageModel = mongoose.model("Message", MessageSchema);
export default MessageModel