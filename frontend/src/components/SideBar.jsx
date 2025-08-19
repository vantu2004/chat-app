import { useChatStore } from "../store/useChatStore.js";
import { useEffect } from "react";
import { FaUserCircle, FaSpinner } from "react-icons/fa";
import { useAuthStore } from "../store/useAuthStore.js";
import { useState } from "react";

const SideBar = () => {
  const { users, selectedUser, setSelectedUser, getUsers, isUserLoading } =
    useChatStore();
  const { onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  // load danh sách users khi mount
  useEffect(() => {
    getUsers();
  }, [getUsers]);

  // nếu chọn "Online only" thì filter danh sách
  const displayedUsers = showOnlineOnly
    ? users.filter((u) => onlineUsers.includes(u._id))
    : users;

  return (
    <>
      <aside className="w-72 max-sm:w-20 bg-base-100 border-r border-base-300 flex flex-col shadow-lg transition-all">
        <div className="p-4 flex items-center justify-between border-b border-base-300">
          <h2 className="text-lg font-bold max-sm:hidden text-base-content">
            Contacts
          </h2>
          <label className="flex items-center gap-2 text-xs cursor-pointer max-sm:hidden text-base-content/70">
            <input
              type="checkbox"
              className="checkbox checkbox-xs checkbox-primary"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
            />
            Online only
          </label>
        </div>
        <div className="flex-1 overflow-y-auto px-2 py-3 space-y-1 scrollbar-thin scrollbar-thumb-base-300 scrollbar-track-transparent">
          {isUserLoading ? (
            <div className="flex justify-center mt-10">
              <FaSpinner className="animate-spin text-primary text-3xl" />
            </div>
          ) : displayedUsers.length === 0 ? (
            <p className="text-center text-base-content/50 mt-6 text-sm italic">
              {showOnlineOnly ? "No online users" : "No users available"}
            </p>
          ) : (
            displayedUsers.map((u) => {
              const isOnline = onlineUsers.includes(u._id); // ✅ check từ mảng userId
              return (
                <button
                  key={u._id}
                  onClick={() => setSelectedUser(u)}
                  className={`flex items-center gap-3 w-full px-3 py-2 rounded-lg transition-all duration-200 
        ${
          selectedUser?._id === u._id
            ? "bg-base-200 shadow-inner font-semibold"
            : "hover:bg-base-200/70"
        }`}
                >
                  <div className="relative">
                    {u.profilePic ? (
                      <img
                        src={u.profilePic}
                        alt={u.fullname}
                        className={`w-11 h-11 rounded-full object-cover border-2 ${
                          isOnline ? "border-success" : "border-base-300"
                        }`}
                      />
                    ) : (
                      <FaUserCircle
                        className={`w-11 h-11 rounded-full text-base-content/40 border-2 ${
                          isOnline ? "border-success" : "border-base-300"
                        }`}
                      />
                    )}
                    {isOnline && (
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-success border-2 border-base-100 rounded-full"></span>
                    )}
                  </div>
                  <div className="flex flex-col items-start max-sm:hidden">
                    <span className="font-medium text-base-content">
                      {u.fullname}
                    </span>
                    <span
                      className={`text-xs ${
                        isOnline ? "text-success" : "text-base-content/50"
                      }`}
                    >
                      {isOnline ? "Online" : "Offline"}
                    </span>
                  </div>
                </button>
              );
            })
          )}
        </div>
      </aside>
    </>
  );
};

export default SideBar;
