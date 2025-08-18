import { useChatStore } from "../store/useChatStore.js";
import ChatContainer from "../components/chat_container/ChatContainer.jsx";
import NoChatSelected from "../components/NoChatSelected.jsx";
import SideBar from "../components/SideBar.jsx";

const HomePage = () => {
  const { selectedUser } = useChatStore();

  return (
    <div className="h-full flex bg-base-200 ">
      <SideBar />
      {selectedUser ? <ChatContainer /> : <NoChatSelected />}
    </div>
  );
};

export default HomePage;
