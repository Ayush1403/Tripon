import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required: true,
        unique: true,
    },
    fullName: {
        type: String,
        required: true,
    },
    email:{
         type: String,
        required: true,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter valid email"]

    },
    password:{
         type: String,
        required: true,
        minLength : 6,
    },
    profilePic:{
         type: String,
        default: ""
    },
    isVerified:{
        type: Boolean,
        default: false,
    },
    otp:{
        type: String
    },
    otpDate:{
        type: Date,
    },
    userType:{
        type: String,
        enum:["User" , "Organiser"],
        default: "User"
    }
},
{timestamps:true})


const User = new mongoose.model("user", userSchema);
export default User;