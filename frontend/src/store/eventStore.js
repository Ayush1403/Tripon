import { create } from 'zustand';
import { axiosAPI } from '../lib/axios';

export const eventState = create((set, get) => ({
  isEventLoading: false,
  isCreating: false,
  events: [],
  eventsDestination: [],
  error: null,

  createUserEvent: async (data) => {
    set({
      isCreating: true,
      error: null
    });
    
    try {
      // ✅ Create FormData object
      const formData = new FormData();
      
      // Append all fields
      formData.append('eventName', data.eventName);
      formData.append('organiserName', data.organiserName);
      formData.append('eventDate', data.eventDate);
      formData.append('place', data.place);
      formData.append('avilableSeats', data.avilableSeats);
      formData.append('price', data.price);
      
      // Append the file
      if (data.eventImage && data.eventImage instanceof File) {
        formData.append('eventImage', data.eventImage);
        console.log("✅ File attached:", data.eventImage.name);
      } else {
        console.error("❌ No valid file!");
        throw new Error("Please select an image");
      }

      // ✅ Send FormData with proper headers
      const res = await axiosAPI.post("/event/create-event", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      // ✅ Add new event to the beginning of the array
      const newEvent = res.data.data;
      set((state) => ({
        isCreating: false,
        error: null,
        events: Array.isArray(newEvent) 
          ? [...newEvent, ...state.events]  // If backend returns array
          : [newEvent, ...state.events],    // If backend returns single object
      }));
      
      return true;
    } catch (error) {
      console.error("Event creation error:", error);
      set({
        isCreating: false,
        error: error.response?.data?.error || error.message || "Something went wrong"
      });
      return false;
    }
  },

  getUserEvent: async () => {
    set({ isEventLoading: true, error: null });
    try {
      const res = await axiosAPI.get("/event/get-event-user");
      set({
        isEventLoading: false,
        events: res.data.data,
      });
    } catch (error) {
      set({
        isEventLoading: false,
        error: error.response?.data?.error || error.error || "Something went wrong",
      });
    }
  },

  getDestinationEvent: async (destination) => {
    set({ isEventLoading: true, error: null });
    try {
      const res = await axiosAPI.get(`/event/itinerary/${destination}`);
      set({
        isEventLoading: false,
        eventsDestination: res.data.data,
      });
    } catch (error) {
      set({
        isEventLoading: false,
        error: error.response?.data?.error || error.error || "Something went wrong",
      });
    }
  },
 
  getEvent: async () => {
    set({ isEventLoading: true, error: null });
    try {
      const res = await axiosAPI.get("/event/organiser-event");
      set({
        isEventLoading: false,
        events: res.data.data,
      });
    } catch (error) {
      set({
        isEventLoading: false,
        error: error.response?.data?.error || error.error || "Something went wrong",
      });
    }
  },
}));