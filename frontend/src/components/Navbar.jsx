import React from "react";
import { Link } from "react-router-dom";
import { userAuthStore } from "../store/userAuthStore.js";
import { MdOutlineMarkChatUnread } from "react-icons/md";
import { FaRegUser } from "react-icons/fa6";
import { CiSettings } from "react-icons/ci";
import { IoIosLogOut } from "react-icons/io";
import { CiUser } from "react-icons/ci";

const Navbar = () => {
  const { authUser, logout } = userAuthStore();

  return (
    <div className="navbar bg-base-100 shadow-md px-6 sticky top-0 z-50">
      {/* Left: Logo + App Name */}
      <div className="flex-1">
        <Link to="/" className="flex items-center gap-3 group">
          {/* Logo */}
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center shadow-md transform transition group-hover:scale-110">
            <MdOutlineMarkChatUnread />
          </div>
          {/* App Name */}
          <span className="text-2xl font-extrabold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent tracking-wide">
            Chat-App
          </span>
        </Link>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        {/* Welcome text */}
        <span className="hidden md:inline text-sm font-medium text-gray-600">
          {authUser ? (
            <>
              Welcome,{" "}
              <span className="text-primary font-semibold">
                {authUser.fullname}
              </span>
            </>
          ) : (
            "Welcome, Guest"
          )}
        </span>

        {/* Settings */}
        <button className="btn btn-ghost btn-circle hover:bg-base-200 transform transition hover:scale-110">
          <CiSettings size={22} />
        </button>

        {authUser ? (
          <>
            {/* Profile */}
            <Link
              to="/profile"
              className="btn btn-ghost btn-circle hover:bg-base-200 transform transition hover:scale-110"
              title="Profile"
            >
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <CiUser size={20} className="text-primary" />
              </div>
            </Link>

            {/* Logout */}
            <button
              onClick={logout}
              className="btn btn-ghost btn-circle text-error hover:bg-error/10 transform transition hover:scale-110"
              title="Logout"
            >
              <IoIosLogOut size={22} />
            </button>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default Navbar;
