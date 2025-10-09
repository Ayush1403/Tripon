import mongoose from "mongoose";

const ItenarySchema = new mongoose.Schema({
     userId: { type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true },
    destination:{
        type: String,
        required: true,
    },
    startDate: {
        type: String,
        required: true
    },
    endDate:{
        type: String,
        required: true
    },
    budget:{
        type: String,
        required: true
    },
    plan:{
        type: Object
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
})

const Itenary = mongoose.model("Itenaries",ItenarySchema)

export default Itenary;