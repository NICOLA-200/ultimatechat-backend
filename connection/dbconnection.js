import mongoose from "mongoose";

 const connect  = async () => {
    try {
     await mongoose.connect(process.env.MONGODB,{ useNewUrlParser: true, 
     useUnifiedTopology: true})
     console.log("db Connected")
    } catch (err)
    {
     console.log("this is the error : " + err);
    }
}


export default connect