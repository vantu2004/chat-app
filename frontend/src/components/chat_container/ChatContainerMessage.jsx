import { useChatStore } from "../../store/useChatStore.js";
import { useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import NoMessagePlaceholder from "./NoMessagePlaceholder.jsx";
import ChatSkeleton from "./ChatSkeleton.jsx";
import { useAuthStore } from "../../store/useAuthStore.js";
import { useRef } from "react";
import { formatTime } from "../../lib/formatTime.js";

const ChatContainerMessage = () => {
  const {
    selectedUser,
    messages,
    getMessage,
    isMessageLoading,
    subscribeToNewMessage,
    unsubscribeToNewMessage,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const bottomRef = useRef(null);

  useEffect(() => {
    if (selectedUser) {
      getMessage(selectedUser._id);
    }

    subscribeToNewMessage();

    // cleanup function → chạy khi component unmount hoặc trước khi chạy lại effect (khi selectedUser đổi) để gỡ bỏ listener cũ
    return () => unsubscribeToNewMessage();
  }, [
    selectedUser,
    getMessage,
    subscribeToNewMessage,
    unsubscribeToNewMessage,
  ]);

  // mỗi khi messages thay đổi thì scroll xuống cuối
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-5 scrollbar-thin scrollbar-thumb-base-300">
      {isMessageLoading ? (
        <ChatSkeleton />
      ) : messages.length === 0 ? (
        <NoMessagePlaceholder user={selectedUser} />
      ) : (
        messages.map((msg, i) => {
          const isReceiver = msg.senderId === selectedUser._id;
          return (
            <div
              key={i}
              className={`flex items-end gap-2 ${
                isReceiver ? "justify-start" : "justify-end"
              }`}
            >
              {/* Avatar bên trái nếu là receiver */}
              {isReceiver &&
                (selectedUser?.profilePic ? (
                  <img
                    src={selectedUser.profilePic}
                    alt="avatar"
                    className="w-8 h-8 rounded-full border border-base-300 shadow-sm"
                  />
                ) : (
                  <FaUserCircle className="w-8 h-8 text-base-300" />
                ))}

              {/* Nội dung tin nhắn */}
              <div className="flex flex-col max-w-xs sm:max-w-sm space-y-2">
                {msg.text && (
                  <div
                    className={`px-4 py-2 rounded-2xl shadow-md break-words ${
                      isReceiver
                        ? "bg-base-200 text-base-content rounded-bl-none"
                        : "bg-primary text-primary-content rounded-br-none"
                    }`}
                  >
                    {msg.text}
                  </div>
                )}
                {msg.image && (
                  <img
                    src={msg.image}
                    alt="attachment"
                    className="rounded-xl max-w-[240px] shadow border border-base-300"
                  />
                )}
                <span
                  className={`text-xs ${
                    isReceiver
                      ? "text-base-content/50 text-left"
                      : "text-primary/80 text-right"
                  }`}
                >
                  {formatTime(msg.createdAt)}
                </span>
              </div>

              {/* Avatar bên phải nếu là sender */}
              {!isReceiver &&
                (authUser?.profilePic ? (
                  <img
                    src={authUser.profilePic}
                    alt="avatar"
                    className="w-8 h-8 rounded-full border border-base-300 shadow-sm"
                  />
                ) : (
                  <FaUserCircle className="w-8 h-8 text-primary" />
                ))}
            </div>
          );
        })
      )}

      {/* mốc để auto scroll */}
      <div ref={bottomRef} />
    </div>
  );
};

export default ChatContainerMessage;
