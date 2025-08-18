import { useChatStore } from "../store/useChatStore.js";
import ChatContainer from "../components/chat_container/ChatContainer.jsx";
import NoChatSelected from "../components/NoChatSelected.jsx";
import SideBar from "../components/SideBar.jsx";

const HomePage = () => {
  const { selectedUser } = useChatStore();

  return (
    <div className="h-full flex bg-base-200 ">
      {/* Sidebar */}
      <aside className="w-72 max-sm:w-20 bg-base-100 border-r border-base-300 flex flex-col shadow-lg transition-all">
        <SideBar />
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center bg-base-200 relative overflow-hidden">
        <div className="absolute inset-0 bg-base-100 opacity-80"></div>
        <div className="relative z-10 w-full h-full flex items-center justify-center">
          {selectedUser ? <ChatContainer /> : <NoChatSelected />}
        </div>
      </main>
    </div>
  );
};

export default HomePage;
