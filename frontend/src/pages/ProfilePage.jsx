import { FaCamera, FaUser, FaEnvelope } from "react-icons/fa";
import { userAuthStore } from "../store/userAuthStore.js";
import { FaUserCircle } from "react-icons/fa";
import { useRef } from "react";

const ProfilePage = () => {
  const { authUser, isUpdating, update } = userAuthStore();
  // tạo một ref (reference) trỏ thẳng tới input file
  const fileInputRef = useRef(null);

  const handleImageUpload = () => {
    fileInputRef.current.click(); // mở hộp chọn file
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // convert file → base64
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      const base64Image = reader.result;
      await update({ profilePic: base64Image });
    };
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 p-6">
      <div className="w-full max-w-2xl card bg-base-100 shadow-2xl rounded-2xl overflow-hidden">
        <div className="card-body p-8">
          {/* Header */}
          <h1 className="text-3xl font-bold text-center mb-2">Profile</h1>
          <p className="text-center text-gray-500 mb-6">
            Your profile information
          </p>

          {/* Avatar */}
          <div className="flex flex-col items-center mb-6">
            <div className="relative">
              {authUser.profilePic ? (
                <img
                  src={authUser.profilePic}
                  alt="avatar"
                  className="w-28 h-28 rounded-full border-4 border-primary object-cover"
                />
              ) : (
                <FaUserCircle className="w-28 h-28 text-gray-400 border-4 border-primary rounded-full p-2" />
              )}

              <button
                onClick={handleImageUpload}
                className="absolute bottom-1 right-1 bg-primary text-white rounded-full p-2 hover:scale-110 transform transition"
              >
                {isUpdating ? (
                  <span className="loading loading-spinner loading-xs"></span>
                ) : (
                  <FaCamera size={16} />
                )}
              </button>
              {/* input file ẩn */}
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
            <span className="text-sm text-gray-500 mt-2">
              Click the camera icon to update your photo
            </span>
          </div>

          {/* Profile Info */}
          <div className="space-y-4">
            {/* Full Name */}
            <div className="flex items-center px-4 rounded-xl border border-gray-600 bg-base-200 h-14 focus-within:ring-2 focus-within:ring-primary transition">
              <FaUser className="mr-3 text-gray-400" />
              <input
                type="text"
                value={authUser.fullname}
                readOnly
                className="grow bg-transparent outline-none text-base-content font-medium"
              />
            </div>

            {/* Email */}
            <div className="flex items-center px-4 rounded-xl border border-gray-600 bg-base-200 h-14 focus-within:ring-2 focus-within:ring-primary transition">
              <FaEnvelope className="mr-3 text-gray-400" />
              <input
                type="text"
                value={authUser.email}
                readOnly
                className="grow bg-transparent outline-none text-base-content font-medium"
              />
            </div>
          </div>

          {/* Account Info */}
          <div className="mt-8 p-4 rounded-xl bg-base-200 border border-gray-700">
            <h2 className="text-lg font-semibold mb-3 text-primary">
              Account Information
            </h2>
            <div className="flex justify-between py-1">
              <span className="text-gray-400">Member Since</span>
              <span className="font-medium">
                {new Date(authUser.createdAt).toLocaleString("vi-VN")}
              </span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-gray-400">Account Status</span>
              <span className="font-medium text-green-500">Active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
