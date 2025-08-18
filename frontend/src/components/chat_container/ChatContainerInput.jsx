import { IoSend, IoImage, IoClose } from "react-icons/io5";
import { useState, useRef } from "react";
import { useChatStore } from "../../store/useChatStore.js";

const ChatContainerInput = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const { sendMessage } = useChatStore();

  const handleImageUpload = () => {
    fileInputRef.current.click(); // mở hộp chọn file
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImagePreview(reader.result); // preview base64
    };
  };

  const removeImage = () => {
    setImagePreview(null);
    // set image input value to null
    if (fileInputRef.current) fileInputRef.current.value = null;
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return; // không gửi rỗng

    await sendMessage({
      text,
      image: imagePreview,
    });

    // reset input
    setText("");
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = null;
  };

  return (
    <div className="p-3 border-t border-base-300 bg-base-200">
      {/* Preview ảnh */}
      {imagePreview && (
        <div className="mb-3 relative w-fit">
          <img
            src={imagePreview}
            alt="preview"
            className="h-32 rounded-lg border border-base-300 shadow-md"
          />
          <button
            onClick={removeImage}
            type="button"
            className="absolute top-1 right-1 bg-base-100 rounded-full p-1 shadow hover:bg-error hover:text-white"
            title="Remove image"
          >
            <IoClose size={16} />
          </button>
        </div>
      )}

      {/* Form nhập chat */}
      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Type a message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="input input-bordered flex-1"
        />

        {/* Nút chọn ảnh */}
        <button
          type="button"
          onClick={handleImageUpload}
          className="btn btn-ghost btn-circle hover:bg-base-300"
          title="Attach image"
        >
          <IoImage size={20} />
        </button>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />

        {/* Nút gửi */}
        <button type="submit" className="btn btn-primary btn-circle">
          <IoSend size={18} />
        </button>
      </form>
    </div>
  );
};

export default ChatContainerInput;
