import ChatContainerHeader from "./ChatContainerHeader.jsx";
import ChatContainerInput from "./ChatContainerInput.jsx";
import ChatContainerMessage from "./ChatContainerMessage.jsx";

const ChatContainer = () => {
  return (
    <main className="flex-1 flex items-center justify-center bg-base-200 relative ">
      <div className="absolute inset-0 bg-base-100 opacity-80"></div>
      <div className="relative z-10 w-full h-full flex items-center justify-center">
        {/* trừ đúng 64px-kích thước mặc định của navbar daisyUI */}
        <div className="w-full h-[calc(100vh-64px)] flex flex-col bg-base-100">
          <ChatContainerHeader />
          <ChatContainerMessage />
          <ChatContainerInput />
        </div>
      </div>
    </main>
  );
};

export default ChatContainer;
