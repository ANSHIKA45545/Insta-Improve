const mongoose =require("mongoose");
const bcrypt=require('bcrypt');
const jwt=require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    phone :{
        type:String,
        required:true,
    },
    password :{
        type:String,
        required:true,
    },
    isAdmin:{
        type:Boolean,
        default:false,
    },
    posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
  isOnline: {
      type: Boolean,
      default: false,
    },

    lastSeen: {
      type: Date,
    },
    
},{ timestamps: true }
);

//save password using bcrypt
userSchema.pre("save",async function(next){
    // console.log("pre method",this);
    if(!this.isModified("password")){
        return next();
    }

    try{
        const saltRound=await bcrypt.genSalt(10);
        const hash_password=await bcrypt.hash(this.password,saltRound);
        this.password = hash_password;
        next();
        
    }catch(error){
        console.error('Hashing error:', error);
        next(error);
    }
});

//compare password
userSchema.methods.comparePassword = async function(password){
    return bcrypt.compare(password,this.password);
};

userSchema.methods.generateToken = async function(){
try{
  return jwt.sign({
    userId :this._id.toString(),
    email:this.email,
    isAdmin:this.isAdmin,
},
  process.env.JWT_SECRET_KEY,
//   {
//     expiresIn:"3d",
//   }
);
}catch(error){
  console.error(error);
}
};

const User = new mongoose.model("User",userSchema);
module.exports = User;