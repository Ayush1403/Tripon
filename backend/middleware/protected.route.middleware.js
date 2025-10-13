
export const protectRoute = async (req, res, next) => {
    try {
        // Try cookie first
        let token = req.cookies?.token;
        
        // If no cookie, try Authorization header
        if (!token) {
            const authHeader = req.headers.authorization;
            if (authHeader && authHeader.startsWith('Bearer ')) {
                token = authHeader.substring(7);
            }
        }

        if (!token) {
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
        req.user = user;
        next();

    } catch (error) {
        console.log('Auth error:', error);
        return res.status(401).json({
            success: false,
            error: "Unauthorized"
        });
    }
};
