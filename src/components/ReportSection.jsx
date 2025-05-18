import React from 'react';
import {
  Users,
  BarChart2,
  MessageSquare,
  Lightbulb,
  CheckCircle,
  Target,
  Star,
  ThumbsUp,
  ThumbsDown
} from 'lucide-react';
import SentimentPill from './SentimentPill';

const cardClass =
  'bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-1';

const ReportSection = ({ report }) => {
  if (!report) return null;

  // Safe destructuring with defaults
  const {
    median: medianPrice = 'N/A',
    average: avgPrice = 'N/A',
    range: priceRange = 'N/A',
    notes = ''
  } = report.pricingAnalysis || {};

  const hasSentiment =
    (report.consumerSentiment?.positive?.length || 0) +
    (report.consumerSentiment?.negative?.length || 0) >
    0;

  return (
    <div className="space-y-8 animate-fadeIn">
      <h3 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-3">
        Market Research Report for:{' '}
        <span className="text-indigo-600">{report.productName}</span>
      </h3>

      {/* Competitor Overview */}
      <div className={cardClass}>
        <h4 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
          <Users size={22} className="mr-2 text-indigo-500" />Competitor Overview
        </h4>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Competitor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price Point
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rating
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Review Summary
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {report.competitorOverview.map(c => (
                <tr key={c.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {c.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {c.pricePoint}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex items-center">
                    {c.rating} <Star size={16} className="ml-1 text-yellow-400 fill-current" />
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate hover:whitespace-normal">
                    {c.reviewSummary || 'No review summary.'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pricing Analysis */}
      <div className={cardClass}>
        <h4 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
          <BarChart2 size={22} className="mr-2 text-green-500" />Pricing Analysis
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div className="p-4 bg-green-50 rounded-lg">
            <p className="text-sm text-green-700 font-medium">Median Price</p>
            <p className="text-2xl font-bold text-green-600">{medianPrice}</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <p className="text-sm text-green-700 font-medium">Average Price</p>
            <p className="text-2xl font-bold text-green-600">{avgPrice}</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <p className="text-sm text-green-700 font-medium">Price Range</p>
            <p className="text-2xl font-bold text-green-600">{priceRange}</p>
          </div>
        </div>
        <p className="text-sm text-gray-600 mt-4">
          <span className="font-semibold">Notes:</span> {notes || 'No notes available.'}
        </p>
      </div>

      {/* Consumer Sentiment */}
      <div className={cardClass}>
        <h4 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
          <MessageSquare size={22} className="mr-2 text-blue-500" />Consumer Sentiment
        </h4>
        {hasSentiment ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h5 className="font-semibold text-gray-600 mb-2 flex items-center">
                <span className="mr-2 text-green-500">
                  <ThumbsUp size={18} />
                </span>
                Positive Themes
              </h5>
              <div className="flex flex-wrap">
                {report.consumerSentiment.positive.map((t, i) => (
                  <SentimentPill key={`pos-${i}`} text={t} type="positive" />
                ))}
              </div>
            </div>
            <div>
              <h5 className="font-semibold text-gray-600 mb-2 flex items-center">
                <span className="mr-2 text-red-500">
                  <ThumbsDown size={18} />
                </span>
                Negative Themes
              </h5>
              <div className="flex flex-wrap">
                {report.consumerSentiment.negative.map((t, i) => (
                  <SentimentPill key={`neg-${i}`} text={t} type="negative" />
                ))}
              </div>
            </div>
          </div>
        ) : (
          <p className="text-gray-500">No consumer sentiment data available.</p>
        )}
      </div>

      {/* Gap Analysis & Opportunities */}
      <div className={cardClass}>
        <h4 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
          <Lightbulb size={22} className="mr-2 text-yellow-500" />Gap Analysis & Opportunities
        </h4>
        {report.gapAnalysis?.length > 0 ? (
          <ul className="space-y-2 list-disc list-inside text-gray-600">
            {report.gapAnalysis.map((g, i) => (
              <li key={i} className="flex items-start">
                <CheckCircle size={18} className="mr-2 text-yellow-600 flex-shrink-0 mt-1" />
                {g}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No gap analysis available.</p>
        )}
      </div>

      {/* Strategic Recommendations */}
      <div className={cardClass}>
        <h4 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
          <Target size={22} className="mr-2" />Strategic Recommendations
        </h4>
        {report.recommendationSummary ? (
          <p className="text-indigo-800">{report.recommendationSummary}</p>
        ) : (
          <p className="text-gray-500">No recommendations available.</p>
        )}
      </div>
    </div>
  );
};

export default ReportSection;
