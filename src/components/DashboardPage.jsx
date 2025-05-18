import { useState } from "react";
import { Brain, Zap, AlertCircle } from "lucide-react";
import ReportSection from "./ReportSection";

// Optionally: Move this into src/utils/api.js
async function fetchMarketResearch(productIdea) {
  const response = await fetch("http://localhost:8000/api/research", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ product_idea: productIdea }),
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.detail || "Failed to fetch research");
  }

  return await response.json();
}

const DashboardPage = ({ user }) => {
  const [productIdea, setProductIdea] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [report, setReport] = useState(null);
  const [error, setError] = useState('');

  const handleGenerateReport = async () => {
    if (!productIdea.trim()) {
      setError("Please enter a product idea or category.");
      setReport(null);
      return;
    }
    setError('');
    setIsLoading(true);
    setReport(null);

    try {
      const data = await fetchMarketResearch(productIdea);
      setReport(data);
    } catch (err) {
      setError(err.message || "An error occurred.");
    }

    setIsLoading(false);
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <header className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Market Research Dashboard</h2>
        {user && <p className="text-gray-600">Welcome back, {user.name || user.email}!</p>}
      </header>

      {/* Input Section */}
      <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Analyze a Product Idea</h3>
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            value={productIdea}
            onChange={(e) => setProductIdea(e.target.value)}
            placeholder="e.g., sustainable water bottles, noise-canceling headphones"
            className="flex-grow p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow"
          />
          <button
            onClick={handleGenerateReport}
            disabled={isLoading}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Analyzing...
              </>
            ) : (
              <>
                <Brain size={20} className="mr-2" /> Generate Report
              </>
            )}
          </button>
        </div>
        {error && <p className="text-red-500 text-sm mt-3 bg-red-100 p-3 rounded-md flex items-center"><AlertCircle size={16} className="mr-2"/>{error}</p>}
      </div>

      {/* Loading Section */}
      {isLoading && (
        <div className="text-center py-10">
          <div className="animate-pulse">
            <Zap size={48} className="mx-auto text-indigo-500 mb-4" />
            <p className="text-lg text-gray-600">Gathering market intelligence... this might take a moment.</p>
          </div>
        </div>
      )}

      {/* Report Section */}
      {report && !isLoading && <ReportSection report={report} />}
    </div>
  );
};

export default DashboardPage;
