import React from "react";
import { useAuth } from "../context/AuthContext";

export default function SignInButton() {
  const { user, signIn, signOut } = useAuth();

  if (user) {
    return (
      <div className="flex items-center space-x-3">
        <img src={user.photoURL} alt="avatar" className="w-8 h-8 rounded-full" />
        <span className="text-gray-700">{user.displayName}</span>
        <button
          onClick={signOut}
          className="px-3 py-1 bg-red-500 text-white rounded"
        >
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={signIn}
      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
    >
      Sign in with Google
    </button>
  );
}
