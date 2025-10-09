import express from 'express'
import { createItenary, getItenary } from '../controller/itenary.controller.js';
import { protectRoute } from '../middleware/protected.route.middleware.js';

const router = express.Router();

router.post('/create',protectRoute,createItenary)
router.get('/get',protectRoute,getItenary);


export default router;