import express from 'express'
import { protectRoute } from '../middleware/protected.route.middleware.js';
import { allTickets, createBooking, getBookings, verifyBooking } from '../controller/booking.controller.js';
import { requireOrganiser } from '../middleware/protected.event.middleware.js';


const router = express.Router();

router.post("/create-order",protectRoute,createBooking);
router.post("/verify",protectRoute,verifyBooking)
router.get('/get/:userId',protectRoute,getBookings)
router.get('/tickets/:eventId',protectRoute,requireOrganiser,allTickets)

export default router;