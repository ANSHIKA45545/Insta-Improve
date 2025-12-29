const {z, string} = require("zod");

const loginSchema = z.object({
    email:z
    .string({required_error :"Email is required"})
    .trim()
    .email({message: "Invalid email address"})
    .min(3, {message: "Email must be atleast of 3 characters"})
    .max(255,{message:"Email must not more than 255 characters"}),

    password:z
    .string({required_error:"Password is required"})
    .min(7,{message:"Password must be atleast 6 character"})
    .max(1024,{message:"Password must not be greater than 1024 characters"})
});

const signupSchema = loginSchema.extend({
    username:z
    .string({required_error :"Name is required"})
    .trim()
    .min(3, {message:"Name must be atleast 3 character"})
    .max(255, {message: "Name must not be more than 255 characters"}),
    email:z
    .string({required_error :"Email is required"})
    .trim()
    .email({message: "Invalid email address"})
    .min(3, {message: "Email must be atleast of 3 characters"})
    .max(255,{message:"Email must not more than 255 characters"}),

    phone:z
    .string({required_error :"Phone is required"})
    .trim()
    .min(10,{message:"Phone must be at least 10 digits"})
    .max(20,{message:"Phone must not be more than 20 characters"}),

    password:z
    .string({required_error:"Password is required"})
    .min(7,{message:"Password must be atleast 6 character"})
    .max(1024,{message:"Password must not be greater than 1024 characters"})

});

module.exports ={signupSchema, loginSchema };