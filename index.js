import express from "express";
import router  from "./routes/auth.js"
import connect from "./connection/dbconnection.js"
import cookieParser from "cookie-parser";
import  userRoute from "./routes/user.js"
import cors from "cors"
import dotenv from 'dotenv'
import cloudinary from "cloudinary"
import messageRoute from "./routes/message.js"
const app = express();

app.use(cors({ origin: ["https://ultimate-chat.vercel.app","http://localhost:3000","http://localhost:5173"],
credentials: true
}))

app.use(cookieParser())
app.use(express.json());
dotenv.config({
     path: "config/.env",
})

cloudinary.config({
     cloud_name: process.env.CLOUDINARY_NAME,
     api_key: process.env.CLOUDINARY_API_KEY,
     api_secret: process.env.CLOUDINARY_API_SECRET
   })

app.get("/" , (req,res) => {
     res.send("good")    
})


app.use("/user",userRoute)
app.use("/auth",router)
app.use("/message",messageRoute)


const port = process.env.PORT || 3001

app.listen(port, () => {
     console.log("port running on port 3000")
     connect()
})
