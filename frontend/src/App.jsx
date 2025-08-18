import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import HomePage from "./pages/HomePage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SettingsPage from "./pages/SettingsPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import { useEffect } from "react";
import { useAuthStore } from "./store/useAuthStore.js";
import { Toaster } from "react-hot-toast";
import { useThemeStore } from "./store/useThemeStore.js";

const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
  const { theme } = useThemeStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && !authUser)
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-ring loading-xl"></span>
      </div>
    );

  return (
    <div data-theme={theme} className="flex flex-col h-screen">
      <Navbar />
      <div className="flex-1">
        <Routes>
          {/* chưa login thì ép login */}
          <Route
            path="/"
            element={authUser ? <HomePage /> : <Navigate to="/login" />}
          />

          {/* đã login rồi thì ép về home */}
          <Route
            path="/signup"
            element={authUser ? <Navigate to="/" /> : <SignUpPage />}
          />
          <Route
            path="/login"
            element={authUser ? <Navigate to="/" /> : <LoginPage />}
          />

          <Route path="/settings" element={<SettingsPage />} />

          <Route
            path="/profile"
            element={authUser ? <ProfilePage /> : <Navigate to="/" />}
          />
        </Routes>
      </div>

      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default App;
