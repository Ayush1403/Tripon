import jwt from 'jsonwebtoken'

export const generateToken = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_KEY, {
        expiresIn: "7d",
    });

    console.log('🔐 Setting cookie for token');

    res.cookie("token", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "none",          
        secure: true,             
        path: "/",
        domain: ".onrender.com",   
    });

    console.log('✅ Cookie set successfully');
    return token;
};
