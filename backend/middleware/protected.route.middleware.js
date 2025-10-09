import Users from '../models/user.model.js'
import jwt from 'jsonwebtoken'

export const protectRoute = async(req,res,next)=>{
    try {
        const newtoken = req.cookies?.token;
        
        if(!newtoken){
            return res.status(404).json({success:false,error:"Token Not Found"});
        }
        const decode = jwt.verify(newtoken,process.env.JWT_KEY);
        if(!decode){
            return res.status(400).json({success:false,error:"Unauthorized"});
        }
        const user = await Users.findById(decode.userId).select("-password")
        req.user = user;
        next();
    } catch (error) {
        res.status(500).json({error:"Internal Server Error"})
        console.log(error)
    }
}