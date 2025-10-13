import Users from '../models/user.model.js'
import jwt from 'jsonwebtoken'

export const protectRoute = async (req, res, next) => {
    try {
        const newtoken = req.cookies?.token;

        if (!newtoken) {
            return res.status(401).json({  // ← CHANGE 404 to 401
                success: false,
                error: "Token Not Found"
            });
        }

        const decode = jwt.verify(newtoken, process.env.JWT_KEY);

        if (!decode) {
            return res.status(401).json({  // ← CHANGE 400 to 401
                success: false,
                error: "Unauthorized"
            });
        }

        const user = await Users.findById(decode.userId).select("-password");
        req.user = user;
        next();

    } catch (error) {
        console.log('Auth error:', error);
        return res.status(401).json({  // ← CHANGE 500 to 401 for auth errors
            success: false,
            error: "Unauthorized"
        });
    }
};
