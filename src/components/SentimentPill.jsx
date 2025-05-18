import { ThumbsUp, ThumbsDown } from 'lucide-react';

const SentimentPill = ({ text, type }) => {
  const baseClasses = "px-3 py-1 text-sm rounded-full inline-flex items-center mr-2 mb-2";
  const typeClasses = type === 'positive' 
    ? "bg-green-100 text-green-700" 
    : "bg-red-100 text-red-700";
  const icon = type === 'positive' 
    ? <ThumbsUp size={14} className="mr-1" /> 
    : <ThumbsDown size={14} className="mr-1" />;
  return <span className={`${baseClasses} ${typeClasses}`}>{icon} {text}</span>;
};

export default SentimentPill;
