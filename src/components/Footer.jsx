export default function Footer() {
  return (
    <footer className="bg-indigo-950 border-t border-purple-900 text-violet-300 py-8">
      <div className="container mx-auto text-center px-6">
        <p>&copy; {new Date().getFullYear()} ScholarAI. All rights reserved.</p>
        <p className="text-sm text-violet-400">
          Streamline your academic research with AI.
        </p>
      </div>
    </footer>
  );
}
