import Events from "../models/event.model.js";
import { uploadCloud } from "../config/cloudinary.js";
import Itenary from "../models/itenary.model.js";
export const createEvent = async(req,res) => {
    const { eventName , organiserName , eventDate , price , place , avilableSeats} = req.body;
     const userId = req.user._id; 

      console.log("=== DEBUG INFO ===");
    console.log("Body:", req.body);
    console.log("File:", req.file);
    console.log("uploadCloud function:", uploadCloud); // This will show if it's imported
    console.log("==================");
     
       let eventImage = null;
        try {
            const result = await uploadCloud(req.file.buffer); // ✅ Use uploadCloud
            eventImage = result.secure_url;
            console.log("Image uploaded successfully:", eventImage);
        } catch (uploadError) {
            console.log("Cloudinary upload error:", uploadError);
            return res.status(500).json({success: false, error: "Failed to upload image"});
        }
    try {
        if(!eventName || !organiserName || !eventDate || !price || !place || !avilableSeats || !eventImage) {
            return res.status(402).json({success:false, error:"Required every detail"});
        }

       

        
       
        if(!req.user) {
            return res.status(404).json({success:false, error:"Organiser Not Logged In"})
        }

         const eventDateOnly = new Date(req.body.eventDate);
eventDateOnly.setHours(0, 0, 0, 0);
        const newEvent =new Events({
            userId,
            eventName,
            organiserName,
            eventDate:eventDateOnly,
            price,
            place,
            Seats: avilableSeats,
            avilableSeats,
            eventImage
        });
 

        if(newEvent){
            await newEvent.save();

            res.status(200).json({
                success:true,
                error: "Event added successfully",
                data:{
                    userId,
            eventName,
            organiserName,
            eventDate,
            price,
            place,
            avilableSeats,
            eventImage
            }
            })
        }

    } catch (error) {
        res.status(500).json({error:"Internal Server Error"});
        console.log(error)
    }
}

export const getEventUserSide = async(req,res)=>{
    const eventId = req.params;

    try {
        const events = await Events.find({}).sort({createdAt : -1})
        
        res.status(200).json({
            success: true ,
            data:events
        })
    } catch (error) {
        
    }
}

export const getEventOrganiserSide = async (req, res) => {
  try {
    if (!req.user?._id) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const userId = req.user._id;

    const events = await Events.find({ userId }).sort({ createdAt: -1 });

    // ✅ Add calculated field for seats booked
    const eventsWithBookingInfo = events.map(event => ({
      ...event.toObject(),
      seatsBooked: event.totalSeats - event.avilableSeats, // ✅ Simple subtraction!
      remainingSeats: event.avilableSeats
    }));

    res.status(200).json({
      success: true,
      data: eventsWithBookingInfo,
    });
  } catch (error) {
    console.error("Error fetching organiser events:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while fetching events",
      error: error.message,
    });
  }
};
export const getEventsByDestination = async (req, res) => {
    try {
        const { destination } = req.params;
        
        if (!destination) {
            return res.status(400).json({
                success: false,
                error: "Destination is required"
            });
        }
        
        const events = await Events.find({
            place: { $regex: new RegExp(destination, 'i') }
        }).sort({ eventDate: 1 });
        
        res.status(200).json({
            success: true,
            count: events.length,
            data: events
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: "Internal Server Error"
        });
        console.log(error);
    }
};