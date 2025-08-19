import { FaUserCircle } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useChatStore } from "../../store/useChatStore.js";
import { useAuthStore } from "../../store/useAuthStore.js";

const ChatContainerHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  if (!selectedUser) return null;

  const isOnline = onlineUsers.includes(selectedUser._id);

  return (
    <div className="p-4 border-b border-base-300 flex items-center justify-between bg-base-200">
      {/* Avatar + Info */}
      <div className="flex items-center gap-3">
        <div className="relative">
          {selectedUser?.profilePic ? (
            <img
              src={selectedUser.profilePic}
              alt={selectedUser.fullname}
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            <FaUserCircle className="w-10 h-10 text-base-content/40" />
          )}

          {/* Online/Offline indicator */}
          {isOnline && (
            <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-base-200 bg-green-500" />
          )}
        </div>

        <div>
          <h2 className="font-semibold">{selectedUser.fullname}</h2>
          <p
            className={`text-xs ${
              isOnline ? "text-green-500 font-medium" : "text-base-content/60"
            }`}
          >
            {isOnline ? "Online" : "Offline"}
          </p>
        </div>
      </div>

      {/* Close button */}
      <button
        onClick={() => setSelectedUser(null)}
        className="btn btn-ghost btn-circle text-base-content/60 hover:text-error hover:bg-error/10"
        title="Close chat"
      >
        <IoClose size={20} />
      </button>
    </div>
  );
};

export default ChatContainerHeader;
