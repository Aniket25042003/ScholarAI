import { BookOpen, LogIn, LogOut } from "lucide-react";
import { useAuthContext } from "../context/AuthContext";

export default function Navbar({ onNavigate }) {
  const { isLoggedIn, signInWithGoogle, logout } = useAuthContext();
  return (
    <nav className="bg-indigo-950 shadow border-b border-purple-900 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center px-6 py-3">
        <div
          className="flex items-center cursor-pointer"
          onClick={() => onNavigate(isLoggedIn ? "dashboard" : "landing")}
        >
          <BookOpen className="w-8 h-8 text-violet-400 mr-2" />
          <span className="text-2xl font-bold text-violet-100">ScholarAI</span>
        </div>
        <div className="flex items-center space-x-4">
          {!isLoggedIn ? (
            <>
              <button
                onClick={() => onNavigate("landing", "features")}
                className="text-violet-300 hover:text-violet-100"
              >
                Features
              </button>
              <button
                onClick={() => onNavigate("landing", "examples")}
                className="text-violet-300 hover:text-violet-100"
              >
                Examples
              </button>
              <button
                onClick={signInWithGoogle}
                className="bg-violet-700 hover:bg-violet-800 text-white px-4 py-2 rounded flex items-center"
              >
                <LogIn className="mr-2" /> Sign In
              </button>
            </>
          ) : (
            <button
              onClick={() => {
                logout();
                onNavigate("landing");
              }}
              className="bg-red-600 text-white px-4 py-2 rounded flex items-center hover:bg-red-700"
            >
              <LogOut className="mr-2" /> Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
