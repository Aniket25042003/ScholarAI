export default function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-indigo-950 border border-purple-900 p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-150">
      <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-gradient-to-br from-purple-800 via-violet-800 to-indigo-800 text-violet-300 rounded-full shadow">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-center text-violet-200 mb-2">{title}</h3>
      <p className="text-violet-400 text-center text-sm">{description}</p>
    </div>
  );
}
