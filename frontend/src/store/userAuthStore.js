import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";

export const userAuthStore = create((set) => ({
  authUser: null,

  isSignedIn: false,
  isLoggedIn: false,
  isUpdating: false,

  isCheckingAuth: true,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data.user });
    } catch (error) {
      console.log(error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },
}));
