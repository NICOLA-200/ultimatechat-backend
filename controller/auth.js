import User from "../model/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";
import NotificationModel from "../model/notification.js";

export const register = async (req, res, next) => {
    try {
  
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);


        const user = await User.findOne({ username : req.body.username})
        if (user != null) {
             return res.send("username taken")
            }
        const newUser = new User({
          ...req.body,
          password: hash
         
        });    
       const userOne =   await newUser.save();
       await NotificationModel.create({owner: userOne._id})
        res.status(200).send("User has been created successfully. click login to login");
      } catch (err) {
        next(err);
      }
 };
 

 export const login = async (req, res, next) => {
    try {
      const user = await User.findOne({ username: req.body.username });
      if (!user) {
         next(createError(404, "User not found!"));
         res.send("wrong password or username!")
         return
      }
  
      const isPasswordCorrect = await bcrypt.compare(
        req.body.password,
        user.password
      );
      
      if (!isPasswordCorrect)   {
      next(createError(400, "Wrong password or username!"));
      res.send("wrong password or username!")
      return 
      } 
       
  
      const token = jwt.sign(
        { id: user._id },
        "secret"
      );
  
      const { password, ...otherDetails } = user._doc;
      const time = 5 * 24 * 60 * 60 * 1000;
      res
        .cookie("access_token", token, {
          // httpOnly: true,
          maxAge: time,
          secure: true, // Set to true if your app uses HTTPS
          sameSite: "None", // Set to "None" for cross-site requests
          
        })
        .status(200)
        .json({ details: { ...otherDetails } });
    } catch (err) {
      next(err);
    }
  };
  
