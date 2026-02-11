import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === "admin" && password === "useradmin") {
      localStorage.setItem("user", username);
      toast.success("Login successful!");
      navigate("/"); // redirect to dashboard
    } else {
      toast.error("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen px-4 py-6 md:py-10 bg-neutral-100 flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden">

        {/* HEADER */}
        <div className="bg-black text-center py-5 px-6">
          <h2 className="text-xl md:text-2xl font-semibold tracking-wide text-blue-100">
            ADMIN LOGIN
          </h2>
          <div className="border-t border-white/30 w-11/12 mx-auto my-2"></div>
          <p className="text-xs md:text-sm text-blue-100">
            Enter your credentials to access the dashboard
          </p>
        </div>

        {/* FORM */}
        <div className="p-4 md:p-6">
          <form className="space-y-4" onSubmit={handleLogin}>

            {/* Username */}
            <div>
              <label className="block text-gray-700 font-medium mb-1 text-sm md:text-base">
                Username
              </label>
              <input
                type="text"
                placeholder="admin"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-gray-700 font-medium mb-1 text-sm md:text-base">
                Password
              </label>
              <input
                type="password"
                placeholder="useradmin"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full bg-gray-600 hover:bg-gray-900 text-white font-semibold py-2.5 rounded-lg transition-all text-sm md:text-base"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
