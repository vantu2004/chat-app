import ChatContainerHeader from "./ChatContainerHeader.jsx";
import ChatContainerInput from "./ChatContainerInput.jsx";
import ChatContainerMessage from "./ChatContainerMessage.jsx";

const ChatContainer = () => {
  return (
    <div className="w-full h-screen flex flex-col bg-base-100">
      <ChatContainerHeader />
      <ChatContainerMessage />
      <ChatContainerInput />
    </div>
  );
};

export default ChatContainer;
