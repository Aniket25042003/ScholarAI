// src/App.jsx
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import LandingPage from "./pages/LandingPage";
import { useAuthContext } from "./context/AuthContext";
import "./index.css";

function App() {
  const { isLoggedIn, user, logout } = useAuthContext();
  const [targetSection, setTargetSection] = useState(null);

  // If LandingPage wants to deep-link to a section, scroll when ready
  useEffect(() => {
    if (targetSection) {
      const el = document.getElementById(targetSection);
      if (el) el.scrollIntoView({ behavior: "smooth" });
      setTargetSection(null);
    }
  }, [targetSection, isLoggedIn]);

  const handleNavigate = (page, section = null) => {
    if (page === "landing") {
      // if already on landing, scroll; otherwise landing will pick it up
      setTargetSection(section);
    } else if (page === "dashboard" && !isLoggedIn) {
      // nothing — user must click Google sign-in in Navbar
    }
  };

  return (
    <div className="font-inter antialiased bg-gray-50 min-h-screen flex flex-col">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
          .font-inter { font-family: 'Inter', sans-serif; }
          .animate-fadeIn { animation: fadeIn 0.5s ease-in-out; }
          @keyframes fadeIn { from { opacity:0; transform:translateY(10px);} to {opacity:1; transform:translateY(0);} }
          .animate-bounce { animation:bounce 2s infinite; }
          @keyframes bounce { 0%,100%{transform:translateY(-5%);} 50%{transform:translateY(0);} }
        `}
      </style>

      <Navbar
        onNavigate={handleNavigate}
        onLogout={() => {
          logout();
          handleNavigate("landing");
        }}
      />

      <main className="flex-grow">
        {isLoggedIn ? (
          <Dashboard user={user} />
        ) : (
          <LandingPage onNavigate={handleNavigate} />
        )}
      </main>
    </div>
  );
}

export default App;
