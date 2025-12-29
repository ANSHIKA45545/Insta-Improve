const User = require("../model/user-model.js");
const bcrypt = require('bcrypt');

const home =async(req,res) =>{
    try{
        res.status(200).send("Home Page");
    }catch(error){
        console.log(error);
    }
}

const register = async(req,res) =>{
    try{
        console.log(req.body);

        const {username,email,phone ,password}=req.body;
        const userExist = await User.findOne({email});

        if(userExist){
            return res.status(400).json({msg: "Email already exists"});
        }

        // const saltRound=10;
        // const hash_password = await bcrypt.hash(password,saltRound);

        const userCreated = await User.create({username,email,phone ,password});
        res.status(201).send({
            msg: "Registration successfully", 
            token: await userCreated.generateToken(), 
            userId: userCreated._id.toString()});
    }catch(error){
        console.error('Registration error:', error);
    res.status(500).json({ msg: "Server error", extraDetails: error.message });
        // next(error);
    }
}

const login = async(req,res) =>{
    try{
        const {email,password}= req.body;
        const userExist = await User.findOne({email});
        console.log(userExist);

        if(!userExist){
            return res.status(400).json({message: "Invalid credentials"});
        }
        // const user = await bcrypt.compare(password, userExist.password);
        const user = await userExist.comparePassword(password);

        if(user){
            res.status(201).send({
                msg: "Login successfully",
                 token: await userExist.generateToken(), 
                userId: userExist._id.toString()});
        }else{
            res.status(401).json({message:"Invalid email or password"});
        }
    }catch(error){
        res.status("Internal server error")
    }
}


const logout = async(_, res) => {
    try {
        return res.cookie("token","", {maxAge:0}).json({
            message:'Logged out successfully.',
            success:tru
        });
    } catch (error) {
        console.log(error);
    }
}

const getProfile = async (req, res) => {
    try {
        const userId = req.params.id;
        let user = await UserfindById(userId);
        return res.status(200).json({
            user,
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}





const user = async(req,res) =>{
    try{
        const userData = req.user;
        console.log(userData);
        return res.status(200).json({userData});
    }catch(error){
        console.log(`Error from the user route ${error}`);
    }
}

module.exports= {home, register,login ,user,logout,getProfile};