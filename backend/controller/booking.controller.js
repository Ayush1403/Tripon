import Bookings from "../models/booking.model.js"
import Events from '../models/event.model.js'
import User from "../models/user.model.js"
import crypto from 'crypto'
import Razorpay from 'razorpay'
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_API_SECRET
});


export const createBooking = async(req,res) => {
    try {
        const {userId , eventId , seatsNeeded , attendeeDetails=[]} = req.body;


    if(!userId || !eventId || !seatsNeeded || !attendeeDetails)
        {
          return  res.status(402).json({success:false,error:"All fields required"})
        }


        const event = await Events.findById(eventId);

        if(!event){
        return res.status(404).json({success:false,error:"No event found"})
        }


        if(event.avilableSeats < seatsNeeded){
         return res.status(400).json({success:false,error:"NOt enough seats avilable"})
           }
        
        const totalPrice = seatsNeeded * event.price;


        const options = {
            amount: totalPrice * 100,
            currency: "INR",
           receipt: `rcpt_${Date.now()}`,
            payment_capture: 1
        }

        const order = await razorpay.orders.create(options);


        return res.json({
            orderId : order.id,
            amount : order.amount,
            currency : order.currency,
            totalPrice,
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({error: "Internal Server Error"})
    }
};


export const verifyBooking = async(req,res) => {
    try {
        const {userId, eventId, seatsNeeded, attendeeDetails = [], razorpay_order_id, razorpay_payment_id, razorpay_signature} = req.body;
        
        if(!razorpay_order_id || !razorpay_payment_id || !razorpay_signature){
           return res.status(400).json({error:"params missing", success:false})
        }
        
        // ✅ FIX: Use process.env.RAZORPAY_API_SECRET
        const generate = crypto
            .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
            .update(`${razorpay_order_id}|${razorpay_payment_id}`)
            .digest("hex")

        if(generate !== razorpay_signature){
            return res.status(400).json({error:"Invalid Signature", success:false})   
        }

        const event = await Events.findById(eventId);
        if(!event){
            return res.status(404).json({success:false, error:"No event found"})
        }

        const totalPrice = seatsNeeded * event.price;

        const booking = new Bookings({
            userId,
            eventId,
            attendeeDetails,
            eventCode: event.eventId,
            seatsNeeded,
            transactionId: razorpay_payment_id,
            paymentMethod: "razorpay",
            paymentStatus: "paid",
            bookingStatus: "confirmed",
            totalPrice,
        })

        await booking.save();
     
        // ✅ FIX: Correct the decrement logic
        await Events.findByIdAndUpdate(eventId, {
            $inc: {avilableSeats: -seatsNeeded}
        })

        res.status(200).json({
            success: true,
            booking
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Internal Server Error"})
    }
}

export const getBookings = async(req,res)=>{
    try {
       const {userId}  = req.params;
       const booked= await Bookings.find({userId}).populate("eventId")
        if(!booked){
          return res.status(404).json({success:false,error:"No event found"})
      }

      return res.json(booked)

    } catch (error) {
          console.log(error);
        res.status(500).json({error:"Internal Server Error"})
    
    }
}

export const allTickets = async(req,res)=>{
    try {
       const {eventId}  = req.params;
       const booked= await Bookings.find({eventId})
        if(!booked){
          return res.status(404).json({success:false,error:"No ticket"})
      }

      return res.json(booked)

    } catch (error) {
          console.log(error);
        res.status(500).json({error:"Internal Server Error"})
    
    }
}