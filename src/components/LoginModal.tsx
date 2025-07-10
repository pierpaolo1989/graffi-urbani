import React, { useState } from "react";

const LoginModal = ({ onClose }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-95 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-80">
        <h2 className="text-lg font-bold mb-4">Login</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              type="text"
              id="username"
              placeholder="Enter your username"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4 relative">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Enter your password"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              {showPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10 4a8 8 0 100 12 8 8 0 000-12zm0 10a4 4 0 110-8 4 4 0 010 8z" />
                  <path d="M10 6a4 4 0 010 8 4 4 0 010-8z" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M3.22 3.22a.75.75 0 011.06 0l12.5 12.5a.75.75 0 11-1.06 1.06l-2.63-2.63a8.49 8.49 0 01-5.09 1.63 8.48 8.48 0 01-6.36-3A8.48 8.48 0 011.4 10c.184-.351.394-.693.63-1.02L3.22 3.22zM16.4 10a8.49 8.49 0 01-1.63 5.09l-1.09-1.09A6.97 6.97 0 0016.4 10a6.97 6.97 0 00-1.72-3.12l1.07-1.07a8.48 8.48 0 011.63 5.19zM10 8a2 2 0 00-2 2 2 2 0 004 0 2 2 0 00-2-2z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </button>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 pt-2 rounded-lg shadow-md"
          >
            Login
          </button>
        </form>
        <div className="mt-4">
          <button
            className="w-full bg-red-500 hover:bg-red-600 text-white px-4 pt-2 rounded-lg shadow-md flex items-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 48 48"
            >
              <path
                fill="#EA4335"
                d="M24 9.5c3.1 0 5.9 1.2 8 3.2l6.1-6.1C34.5 3.2 29.6 1 24 1 14.6 1 6.7 6.8 3 15l7.1 5.6C12 13.2 17.4 9.5 24 9.5z"
              />
              <path
                fill="#4285F4"
                d="M48 24c0-1.6-.2-3.1-.5-4.5H24v9h13.6c-1.2 4.1-4.8 7.4-9.6 8.2v6.8H38c6.7-6.1 10-15 10-24z"
              />
              <path
                fill="#FBBC05"
                d="M10.1 27l-7.1 5.6c3.4 7.2 10.8 12.4 19 12.4 5.3 0 10.3-2 14.1-5.5l-7.1-5.8C26.2 36.2 18.2 32 10.1 27z"
              />
              <path
                fill="#34A853"
                d="M3 15l7.1 5.6c2-5.1 6.8-8.8 12.9-8.8 3.5 0 6.7 1.3 9.2 3.4l7.1-5.6C34.8 4.9 29.9 1 24 1 14.6 1 6.7 6.8 3 15z"
              />
            </svg>
            Login con Gmail
          </button>
        </div>
        <button
          onClick={onClose}
          className="absolute top-2 left-5 text-6xl text-white hover:text-gray-700"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default LoginModal;
