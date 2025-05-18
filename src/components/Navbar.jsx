// src/components/Navbar.jsx
import { ShoppingBag, LogIn, LogOut, BookOpen } from 'lucide-react';
import { useAuthContext } from '../context/AuthContext';

const Navbar = ({ onNavigate }) => {
  const { isLoggedIn, signInWithGoogle, logout } = useAuthContext();

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <div
          className="flex items-center cursor-pointer"
          onClick={() => onNavigate(isLoggedIn ? 'dashboard' : 'landing')}
        >
          <BookOpen className="h-8 w-8 text-indigo-600 mr-2" />
          <h1 className="text-2xl font-bold text-gray-800">MarketMinds</h1>
        </div>
        <div className="flex items-center space-x-4">
          {!isLoggedIn ? (
            <>
              <a
                href="#features"
                onClick={e => { e.preventDefault(); onNavigate('landing','features'); }}
                className="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                Features
              </a>
              <a
                href="#examples"
                onClick={e => { e.preventDefault(); onNavigate('landing','examples'); }}
                className="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                Examples
              </a>
              <button
                onClick={signInWithGoogle}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-150 ease-in-out flex items-center"
              >
                <LogIn size={18} className="mr-2" />
                Sign in with Google
              </button>
            </>
          ) : (
            <button
              onClick={() => { logout(); onNavigate('landing'); }}
              className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-150 ease-in-out flex items-center"
            >
              <LogOut size={18} className="mr-2" />
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
