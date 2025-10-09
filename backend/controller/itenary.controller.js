import Itinerary from "../models/itenary.model.js"; // consider renaming the file/model too
import { generateItenary } from "../services/gemini.services.js";

export const createItenary = async (req, res) => {
  try {
    const { destination, startDate, endDate, budget } = req.body;
    const userId = req.user._id;

    if (!destination || !startDate || !endDate || !budget) {
      return res.status(400).json({ success: false, error: "All fields are required" });
    }

    const plan = await generateItenary(destination, startDate, endDate, budget);

    if (!plan) {
      return res.status(500).json({ success: false, error: "Failed to generate itinerary" });
    }

    const itinerary = new Itinerary({ userId, destination, startDate, endDate, budget, plan });
    await itinerary.save();

    res.json({ success: true, data: plan });
  } catch (error) {
    console.error("Error creating itinerary:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

export const getItenary = async (req, res) => {
  try {
    const userId = req.user._id;
    const itineraries = await Itinerary.find({ userId });
    res.json({ success: true, data: itineraries });
  } catch (error) {
    console.error("Error fetching itineraries:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};
