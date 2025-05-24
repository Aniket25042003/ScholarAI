import { BookOpen, ChevronRight } from "lucide-react";
import { useAuthContext } from "../context/AuthContext";

export default function HeroSection() {
  const { signInWithGoogle } = useAuthContext();
  return (
    <section className="bg-gradient-to-r from-purple-950 via-indigo-900 to-indigo-800 text-white py-20">
      <div className="container mx-auto text-center px-6">
        <BookOpen className="mx-auto mb-6 w-20 h-20 animate-bounce text-violet-400" />
        <h1 className="text-4xl font-extrabold mb-4 text-violet-100">
          Unlock Academic Insights with AI
        </h1>
        <p className="mb-8 text-lg max-w-xl mx-auto text-violet-200">
          ScholarAI empowers researchers to fetch literature, generate reports, and interact via chat — all in one place.
        </p>
        <button
          onClick={signInWithGoogle}
          className="bg-violet-700 hover:bg-violet-800 text-white font-bold py-3 px-8 rounded shadow flex items-center mx-auto transition"
        >
          Get Started Free <ChevronRight className="ml-2" />
        </button>
      </div>
    </section>
  );
}
