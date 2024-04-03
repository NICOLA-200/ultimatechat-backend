import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    notNumber: {
      type: Number,
      default: 0
    },
    owner: {
     type: mongoose.Types.ObjectId,
    }

  },

);

const NotificationModel = mongoose.model("notification", notificationSchema);
export default NotificationModel