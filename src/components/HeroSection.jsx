// src/components/HeroSection.jsx
import {ChevronRight, BookOpen } from 'lucide-react';
import { useAuthContext } from '../context/AuthContext';

const HeroSection = () => {
  const { signInWithGoogle } = useAuthContext();

  return (
    <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20 md:py-32">
      <div className="container mx-auto px-6 text-center">
        <BookOpen className="h-24 w-24 text-white mx-auto mb-6 animate-bounce" />
        <h2 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
          Unlock Market Insights with AI.
        </h2>
        <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto text-indigo-100">
          MarketMinds empowers entrepreneurs and businesses to quickly assess product viability, understand competition, and discover market opportunities – all powered by AI.
        </p>
        <button
          onClick={signInWithGoogle}
          className="bg-white text-indigo-600 font-bold py-3 px-8 rounded-lg shadow-xl hover:bg-indigo-100 transition duration-150 ease-in-out text-lg transform hover:scale-105 flex items-center mx-auto"
        >
          Get Started Free <ChevronRight size={20} className="ml-2" />
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
