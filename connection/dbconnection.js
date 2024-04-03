import mongoose from "mongoose";

 const connect  = async () => {
    try {
     await mongoose.connect("mongodb://127.0.0.1:27017/ultimateChat",{ useNewUrlParser: true, 
     useUnifiedTopology: true})
     console.log("db Connected")
    } catch (err)
    {
     console.log("this is the error : " + err);
    }
}


export default connect