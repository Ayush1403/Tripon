import mongoose from 'mongoose'


const bookingSchema = new mongoose.Schema({
    bookingId:{
        type:String,
        unique:true,

    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Users",
        required:true,
    },
    eventId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Events",
        required:true,
    },
    seatsNeeded:{
        type:Number,
        required:true,
    },
    totalPrice:{
        type:Number,
        required:true,
    },
    bookingDate:{
        type:Date,

    },
    attendeeDetails:{
        name:{
            type:String,
            required:true
        },
        Mobile:{
            type:Number,
            required:true
        }
    },
    bookingStatus:{
        type:String,
        enum: ["confirmed" , "cancelled" , "pending"],
        required:true
    },
    eventCode:{
        type:String
    },
    paymentStatus:{
          type:String,
        enum: ["paid" , "cancelled" , "pending"],
        required:true
    },
    paymentMethod:{
        type:String,
        default:null
    },
    transactionId:{
         type:String,
        default:null
    }
})

let counter = 0;

bookingSchema.pre("save",async function(next){

    if(!this.bookingId){
        counter += 1;
        this.bookingId = "B" + Date.now() + counter;
    }
    return null;

});


const Bookings = new mongoose.model("Bookings" , bookingSchema);

export default Bookings;