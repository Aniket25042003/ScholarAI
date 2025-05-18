import { Search, Users, MessageSquare, Lightbulb } from 'lucide-react';
import FeatureCard from './FeatureCard';

const features = [
  { icon: <Search size={32} />, title: "Automated Research", description: "Crawls marketplaces & datasets for pricing, reviews, and trends." },
  { icon: <Users size={32} />, title: "Competitor Analysis", description: "Identifies key competitors, their strengths, and weaknesses." },
  { icon: <MessageSquare size={32} />, title: "Consumer Sentiment", description: "Analyzes customer feedback to find unmet needs and pain points." },
  { icon: <Lightbulb size={32} />, title: "Opportunity Spotting", description: "Pinpoints market gaps and unique selling propositions." },
];

const FeaturesSection = () => (
  <section id="features" className="py-16 bg-gray-50">
    <div className="container mx-auto px-6">
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-4">Why MarketMinds?</h2>
      <p className="text-lg text-gray-600 text-center mb-12 max-w-xl mx-auto">
        Market research is complex. We make it simple, fast, and actionable. Save time, reduce costs, and make data-driven decisions.
      </p>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map(feature => <FeatureCard key={feature.title} {...feature} />)}
      </div>
    </div>
  </section>
);

export default FeaturesSection;
