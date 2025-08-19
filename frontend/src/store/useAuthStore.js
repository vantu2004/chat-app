import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import { useChatStore } from "./useChatStore.js";
import { io } from "socket.io-client";

const BASE_URL =
  import.meta.env.MODE === "development" ? "http://localhost:5000/api" : "/";

export const useAuthStore = create((set, get) => ({
  authUser: null,

  isSigningUp: false,
  isLoggingIn: false,
  isUpdating: false,
  isCheckingAuth: true,

  onlineUsers: [],

  socket: null,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });

      get().connectSocket();
    } catch (error) {
      console.log(error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data });

      toast.success("Signup success");

      get().connectSocket();
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });
      toast.success("Login success");

      get().connectSocket();
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.get("/auth/logout");
      set({ authUser: null });

      // khi logout thì reset selectedUser trong useChatStore để tránh login đúng tài khoản người đó thì auto mở chat với người đó -> lỗi logic
      useChatStore.getState().reset();

      toast.success("Logout success");

      get().disconnectSocket();
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  },

  update: async (data) => {
    set({ isUpdating: true });
    try {
      const res = await axiosInstance.put("/auth/update-profile", data);
      set({ authUser: res.data });
      toast.success("Update success");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      set({ isUpdating: false });
    }
  },

  connectSocket: () => {
    const { authUser, socket } = get();
    if (!authUser || socket?.connected) {
      return;
    }

    const newSocket = io(BASE_URL, {
      query: {
        userId: authUser._id,
      },
    });
    set({ socket: newSocket });

    // phải trùng "getOnlineUsers" vs bên BE
    newSocket.on("getOnlineUsers", (data) => {
      set({ onlineUsers: data });
    });
  },

  disconnectSocket: () => {
    const { socket } = get();
    if (socket?.connected) {
      socket.disconnect();
      set({ socket: null });
    }
  },
}));
