import mongoose from 'mongoose'


export const EventSchema = new mongoose.Schema({
     userId: { type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true },
    eventId: {
        type: String,
        unique: true,
    },
    eventName:{
        type: String,
        required: true,
    },
    organiserName:{
         type: String,
        required: true,
    },
    place:{
         type: String,
        required: true,
    },
    price:{
         type: Number,
        required: true,
    },
    avilableSeats:{
         type: Number,
        required: true,
    },
    eventDate:{
         type: Date,
        required: true,
    },
    eventImage:{
        type: String,
        default: null,
        required: true,
    },
    isExpired:{
        type: Boolean,
        default: false
    },
     Seats: 
      { type: Number,
         required: true 
      },

},{timestamps:true})

let counter = 0;

EventSchema.pre("save", async function(next){
    if(!this.eventId){
        counter += 1;
        this.eventId = "E" + Date.now() + "-" + counter;
    }
    next();
});

const Events = new mongoose.model("Events" , EventSchema);

export default Events;