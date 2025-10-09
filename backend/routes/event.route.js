import express from 'express'
import { protectRoute } from '../middleware/protected.route.middleware.js';
import { requireOrganiser } from '../middleware/protected.event.middleware.js';
import { createEvent, getEventOrganiserSide, getEventUserSide , getEventsByDestination } from '../controller/event.controller.js';
import { upload } from '../config/cloudinary.js';


const router = express.Router();

router.post("/create-event",protectRoute,requireOrganiser,upload.single('eventImage'),createEvent)
router.get("/get-event-user",protectRoute,getEventUserSide)
router.get("/organiser-event",protectRoute,requireOrganiser,getEventOrganiserSide)
router.get('/itinerary/:destination', getEventsByDestination);

export default router;