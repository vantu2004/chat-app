import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUserLoading: false,
  isMessageLoading: false,

  getUsers: async () => {
    set({ isUserLoading: true });
    try {
      const res = await axiosInstance.get("/message/users");
      set({ users: res.data });
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      set({ isUserLoading: false });
    }
  },

  getMessage: async (receiverId) => {
    set({ isMessageLoading: true });
    try {
      const res = await axiosInstance.get(
        `/message/conversation/${receiverId}`
      );
      set({ messages: res.data });
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      set({ isMessageLoading: false });
    }
  },

  sendMessage: async (data) => {
    try {
      const { selectedUser, messages } = get();

      const res = await axiosInstance.post(
        `/message/conversation/${selectedUser._id}`,
        data
      );
      set({ messages: [...messages, res.data] });
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  },

  setSelectedUser: (user) => set({ selectedUser: user }),

  reset: () => set({ selectedUser: null }),
}));
