import { create } from "zustand";
import { axiosAPI } from "../lib/axios";

export const bookingState = create((set) => ({
  isBookingLoaded: false,
  isLoading: false,
  order: null,
  error: null,

  createBooking: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axiosAPI.post("/book/create-order", data);
      set({ order: res.data, isLoading: false });
      return res.data;
    } catch (err) {
      set({ error: err.response?.data?.message || "Booking failed", isLoading: false });
    }
  },

  verifyBooking: async (data) => {
    try {
      const res = await axiosAPI.post("/book/verify", data);
      return res.data;
    } catch (err) {
      console.error(err);
      return { success: false, message: "Verification failed" };
    }
  },

  getAllTickets: async(eventId) => {
      set({
        isBookingLoaded:true,
        error: null,
      })
      try {
        const res = await axiosAPI.get(`/book/tickets/${eventId}`)
        set({
          isBookingLoaded:false,
          order: res.data,
          error: null,
        })
      } catch (error) {
         set({
          isBookingLoaded:false,
          error: error?.response?.error || error.error,
        })
      }
  },
  getTickets: async(userId) => {
      set({
        isBookingLoaded:true,
        error: null,
      })
      try {
        const res = await axiosAPI.get(`/book/get/${userId}`)
        set({
          isBookingLoaded:false,
          order: res.data,
          error: null,
        })
      } catch (error) {
         set({
          isBookingLoaded:false,
          error: error?.response?.error || error.error,
        })
      }
  }
}));
