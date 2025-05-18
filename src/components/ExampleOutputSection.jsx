import { Eye, DollarSign, MessageSquare, Lightbulb, CheckCircle } from 'lucide-react';

const exampleProduct = "Eco-friendly Yoga Mats";
const exampleOutput = {
  competitorOverview: "Top brands: Liforme, Manduka, JadeYoga. Avg. Price: $80. Avg. Rating: 4.7/5.",
  pricingAnalysis: "Median Price: $75. Range: $30 (budget) - $150 (premium).",
  consumerSentiment: "Positive: Grip, eco-materials, durability. Negative: Smell (some brands), price.",
  gapAnalysis: "Opportunity for mid-range, highly durable, odorless biodegradable mats.",
  recommendation: "Focus on sustainable, non-toxic materials with superior grip. Target eco-conscious yogis with mid-to-premium pricing."
};

const ExampleOutputSection = () => (
  <section id="examples" className="py-16">
    <div className="container mx-auto px-6">
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">See The Power of MarketMinds</h2>
      <div className="bg-white p-8 rounded-xl max-w-2xl mx-auto border border-indigo-100 shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-1">
        <div className="mb-6">
          <p className="text-sm text-gray-500">If user inputs:</p>
          <h3 className="text-2xl font-semibold text-indigo-600">{exampleProduct}</h3>
        </div>
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-gray-700 flex items-center"><Eye size={18} className="mr-2 text-indigo-500" /> Competitor Overview:</h4>
            <p className="text-gray-600 text-sm ml-6">{exampleOutput.competitorOverview}</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-700 flex items-center"><DollarSign size={18} className="mr-2 text-green-500" /> Pricing Analysis:</h4>
            <p className="text-gray-600 text-sm ml-6">{exampleOutput.pricingAnalysis}</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-700 flex items-center"><MessageSquare size={18} className="mr-2 text-blue-500" /> Consumer Sentiment:</h4>
            <p className="text-gray-600 text-sm ml-6">{exampleOutput.consumerSentiment}</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-700 flex items-center"><Lightbulb size={18} className="mr-2 text-yellow-500" /> Gap Analysis:</h4>
            <p className="text-gray-600 text-sm ml-6">{exampleOutput.gapAnalysis}</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-700 flex items-center"><CheckCircle size={18} className="mr-2 text-teal-500" /> Recommendation Summary:</h4>
            <p className="text-gray-600 text-sm ml-6">{exampleOutput.recommendation}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default ExampleOutputSection;
