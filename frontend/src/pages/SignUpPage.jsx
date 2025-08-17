import { useState } from "react";
import { userAuthStore } from "../store/userAuthStore.js";
import { Link } from "react-router-dom";
import AuthImagePattern from "../components/AuthImagePattern.jsx";
import toast from "react-hot-toast";

const SignUpPage = () => {
  const [form, setForm] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  const { isSigningUp, signup } = userAuthStore();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = (form) => {
    // Regex email chuẩn cơ bản
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const rules = [
      {
        valid: form.fullname.trim().length >= 3,
        message: "fullname must be at least 3 characters",
      },
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
      signup(form);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-base-200">
      {/* Left Panel */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="card w-full max-w-lg shadow-2xl bg-base-100 rounded-2xl">
          <div className="card-body p-8">
            <h1 className="text-4xl font-extrabold text-center mb-2">
              Join the Conversation
            </h1>
            <p className="text-center text-gray-500 mb-6">
              Create your account and start chatting now!
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* fullname */}
              <div className="flex items-center px-4 rounded-xl border border-gray-700 bg-base-200 hover:bg-base-300 focus-within:ring-2 focus-within:ring-primary h-14 transition">
                <span className="mr-3 text-gray-400 text-lg">👤</span>
                <input
                  type="text"
                  name="fullname"
                  placeholder="fullname"
                  value={form.fullname}
                  onChange={handleChange}
                  className="grow bg-transparent outline-none text-base-content"
                />
              </div>

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
                disabled={isSigningUp}
              >
                {isSigningUp ? (
                  <>
                    Loading{" "}
                    <span className="loading loading-dots loading-sm"></span>
                  </>
                ) : (
                  "Create Account"
                )}{" "}
              </button>
            </form>

            <p className="text-center text-sm text-gray-500 mt-6">
              Already have an account?{" "}
              <Link to="/login" className="link link-primary">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>

      <AuthImagePattern />
    </div>
  );
};

export default SignUpPage;
