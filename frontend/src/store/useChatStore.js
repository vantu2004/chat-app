import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore.js";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUserLoading: false,
  isMessageLoading: false,
  isSendingMessage: false,

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
    set({ isSendingMessage: true });
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
    } finally{
      set({isSendingMessage: false})
    }
  },

  setSelectedUser: (user) => set({ selectedUser: user }),

  reset: () => set({ selectedUser: null }),

  subscribeToNewMessage: () => {
    if (!get().selectedUser) {
      return;
    }

    // lấy socket tại useAuthStore.js
    const { socket } = useAuthStore.getState();

    // lấy tin nhắn từ sender và set lại vào messages
    socket.on("newMessage", (data) => {
      // đứng ở phía người nhận tin, nếu tin nhán từ đúng senderId trùng với selectedUser thì mới render lại messages
      if (data.senderId !== get().selectedUser._id) {
        return;
      }

      set({ messages: [...get().messages, data] });
    });
  },

  unsubscribeToNewMessage: () => {
    const { socket } = useAuthStore.getState();
    socket.off("newMessage");
  },
}));
