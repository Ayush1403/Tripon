import express from 'express'
import { checkAuth, createUser, logoutUser, resendOtp, userSignin, verifyUser } from '../controller/auth.controller.js';
import { protectRoute } from '../middleware/protected.route.middleware.js';

const router = express.Router();

router.post('/signup',createUser)
router.post('/login',userSignin)
router.post('/verify',verifyUser)
router.post('/resend',resendOtp)
router.post('/logout',protectRoute,logoutUser)

router.get('/check',protectRoute,checkAuth)
export default router;