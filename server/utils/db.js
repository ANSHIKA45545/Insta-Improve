const mongoose = require("mongoose");

// const URI = "mongodb://127.0.0.1:27017/Tech";
// mongodb://127.0.0.1:27017/
const URI = process.env.MONGODB_URI;

const connectDb =async()=>{
try{
   await mongoose.connect(URI);
   console.log('connection successful to database');
}catch(error){
    console.log("Database connection is failed", error.message);
    process.exit(0);
}
}
module.exports=connectDb;
