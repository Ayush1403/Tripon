import jwt from 'jsonwebtoken'
import Users from '../models/user.model.js'

export const protectRoute = async (req, res, next) => {
    try {
        // Try to get token from cookie first
        let token = req.cookies?.token;
        
        // If no cookie, try Authorization header
        if (!token) {
            const authHeader = req.headers.authorization;
            if (authHeader && authHeader.startsWith('Bearer ')) {
                token = authHeader.substring(7);
                console.log('🔐 Using token from Authorization header');
            }
        } else {
            console.log('🍪 Using token from cookie');
        }

        if (!token) {
            console.log('❌ No token found in cookie or header');
            return res.status(401).json({
                success: false,
                error: "Token Not Found"
            });
        }

        const decode = jwt.verify(token, process.env.JWT_KEY);

        if (!decode) {
            return res.status(401).json({
                success: false,
                error: "Unauthorized"
            });
        }

        const user = await Users.findById(decode.userId).select("-password");
        
        if (!user) {
            return res.status(401).json({
                success: false,
                error: "User not found"
            });
        }
        
        req.user = user;
        next();

    } catch (error) {
        console.log('Auth error:', error.message);
        return res.status(401).json({
            success: false,
            error: "Unauthorized"
        });
    }
};
