import { IoChatbubbles } from "react-icons/io5";

const NoMessagePlaceholder = ({ user }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center h-full animate-fadeIn">
      {/* Icon */}
      <div className="mb-4">
        <IoChatbubbles className="text-6xl text-primary animate-bounce" />
      </div>

      {/* Text */}
      <h2 className="text-xl font-bold text-base-content">No messages yet</h2>
      <p className="text-base-content/60 mt-2 max-w-sm">
        Start a conversation with{" "}
        <span className="font-semibold">{user?.fullname}</span> and break the
        ice! 👋
      </p>
    </div>
  );
};

export default NoMessagePlaceholder;
