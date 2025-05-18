const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-1">
    <div className="flex items-center justify-center w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full mb-4 mx-auto">
      {icon}
    </div>
    <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">{title}</h3>
    <p className="text-gray-600 text-sm text-center">{description}</p>
  </div>
);

export default FeatureCard;
