import { useState } from "react";
import { userAuthStore } from "../store/userAuthStore.js";
import { Link } from "react-router-dom";
import AuthImagePattern from "../components/AuthImagePattern.jsx";
import toast from "react-hot-toast";

const LoginPage = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const { isLoggingIn, login } = userAuthStore();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = (form) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const rules = [
      {
        valid: !!form.email.trim(),
        message: "Email is required",
      },
      {
        valid: emailRegex.test(form.email),
        message: "Invalid email format",
      },
      {
        valid: form.password.trim().length >= 6,
        message: "Password must be at least 6 characters",
      },
    ];

    for (let rule of rules) {
      if (!rule.valid) {
        toast.error(rule.message);
        return false;
      }
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm(form)) {
      login(form);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-base-200">
      {/* Left panel: Image */}
      <AuthImagePattern />

      {/* Right panel: Form */}
      <div className="flex-1 flex items-center justify-center p-8 order-1 lg:order-2">
        <div className="card w-full max-w-lg shadow-2xl bg-base-100 rounded-2xl">
          <div className="card-body p-8">
            <h1 className="text-4xl font-extrabold text-center mb-2">
              Welcome Back
            </h1>
            <p className="text-center text-gray-500 mb-6">
              Login to continue your conversation
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div className="flex items-center px-4 rounded-xl border border-gray-700 bg-base-200 hover:bg-base-300 focus-within:ring-2 focus-within:ring-primary h-14 transition">
                <span className="mr-3 text-gray-400 text-lg">📧</span>
                <input
                  type="text"
                  name="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={handleChange}
                  className="grow bg-transparent outline-none text-base-content"
                />
              </div>

              {/* Password */}
              <div className="flex items-center px-4 rounded-xl border border-gray-700 bg-base-200 hover:bg-base-300 focus-within:ring-2 focus-within:ring-primary h-14 transition">
                <span className="mr-3 text-gray-400 text-lg">🔒</span>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={form.password}
                  onChange={handleChange}
                  className="grow bg-transparent outline-none text-base-content"
                />
              </div>

              {/* Button */}
              <button
                className="btn btn-primary w-full h-14 rounded-xl text-lg font-semibold flex items-center justify-center gap-2 transform transition hover:scale-105 hover:shadow-[0_0_15px_rgba(59,130,246,0.6)]"
                disabled={isLoggingIn}
              >
                {isLoggingIn ? (
                  <>
                    Loading{" "}
                    <span className="loading loading-dots loading-sm"></span>
                  </>
                ) : (
                  "Login"
                )}
              </button>
            </form>

            <p className="text-center text-sm text-gray-500 mt-6">
              Don&apos;t have an account?{" "}
              <Link to="/signup" className="link link-primary">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
