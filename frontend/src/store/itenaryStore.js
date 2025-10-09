import { create } from "zustand";
import { axiosAPI } from "../lib/axios";

export const itenaryState = create((set, get) => ({
  itenaries: [],
  isItenaryLoading: false,
  isItenaryCreating: false,
  selectedItenary: JSON.parse(localStorage.getItem("selectedItenary")) || null,
  error: null,

  itenaryCreate: async (data) => {
    set({ isItenaryCreating: true, error: null });

    try {
      const res = await axiosAPI.post("/iten/create", data);
      const createItenary = res.data.data;

      if (res.data.success) {
        set({
          isItenaryCreating: false,
          error: null,
          itenaries: [...get().itenaries, createItenary],
          selectedItenary: createItenary,
        });

        // Save once in localStorage
        localStorage.setItem("selectedItenary", JSON.stringify(createItenary));
        return createItenary;
      } else {
        set({ error: res.data.error, isItenaryCreating: false });
        return null;
      }
    } catch (error) {
      set({
        error: error.response?.data?.error || error.error,
        isItenaryCreating: false,
      });
      return null;
    }
  },

  itenaryGet: async () => {
    set({ isItenaryLoading: true, error: null });
    try {
      const res = await axiosAPI.get("/iten/get");
      if (res.data.success) {
        const all = res.data.data;
        set({ itenaries: all, isItenaryLoading: false });
        // Return the latest itinerary if available
        return all.length > 0 ? all[all.length - 1] : null;
      } else {
        set({ error: res.data.error, isItenaryLoading: false });
        return null;
      }
    } catch (error) {
      set({
        error: error.response?.data?.error || error.error,
        isItenaryLoading: false,
      });
      return null;
    }
  },

  setSelectedItenary: (itenary) => {
    set({ selectedItenary: itenary });
    localStorage.setItem("selectedItenary", JSON.stringify(itenary));
  },
}));
