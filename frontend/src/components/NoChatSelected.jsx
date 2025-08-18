import React from "react";
import { CiChat1 } from "react-icons/ci";

const NoChatSelected = () => {
  return (
    <div className="flex flex-1 flex-col items-center justify-center text-center space-y-5 px-6 py-10">
      {/* Icon */}
      <div className="flex justify-center">
        <span className="text-7xl animate-bounce">
          <CiChat1 />
        </span>
      </div>

      {/* Title */}
      <h1 className="text-2xl sm:text-3xl font-extrabold text-base-content">
        Welcome to <span className="text-primary">Chat-App!</span>
      </h1>

      {/* Subtitle */}
      <p className="text-base-content/60 text-sm sm:text-base max-w-md">
        Select a conversation from the sidebar to start chatting, or create a
        new one to begin your journey 🚀
      </p>

      {/* Decorative element */}
      <div className="mt-6 w-20 h-1 rounded-full bg-primary/60"></div>
    </div>
  );
};

export default NoChatSelected;
