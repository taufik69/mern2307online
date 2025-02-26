import React from "react";

const ResetPasswod = () => {
  return (
    <body class="bg-gradient-to-r from-indigo-800 to-black flex items-center justify-center min-h-screen p-4">
      <div class="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full animate-fade-in">
        <h2 class="text-2xl font-bold text-center text-indigo-800 mb-8">
          Reset Password
        </h2>
        <form id="registrationForm" class="space-y-6" novalidate>
          <div>
            <label
              for="password"
              class="block text-indigo-900 font-semibold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-800 transition-all duration-300"
              placeholder="Enter your password"
              required
            />
            <p class="text-red-500 text-sm mt-2 hidden" id="passwordError">
              Password is required.
            </p>
          </div>

          <div>
            <label
              for="confirm-password"
              class="block text-indigo-900 font-semibold mb-2"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirm-password"
              class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-800 transition-all duration-300"
              placeholder="Confirm your password"
              required
            />
            <p
              class="text-red-500 text-sm mt-2 hidden"
              id="confirmPasswordError"
            >
              Passwords do not match.
            </p>
          </div>

          <button
            type="submit"
            class="w-full bg-indigo-800 text-white py-3 rounded-lg font-semibold hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-indigo-800 focus:ring-offset-2 transition-all duration-300 transform hover:scale-[1.02]"
          >
            Submit
          </button>
        </form>
      </div>
    </body>
  );
};

export default ResetPasswod;
