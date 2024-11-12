import { TrendingUp, TrendingDown } from 'lucide-react';

interface InsightCardProps {
  title: string;
  description: string;
  impact: 'positive' | 'negative';
  value: string;
}

export default function InsightCard({ title, description, impact, value }: InsightCardProps) {
  return (
    <div className="p-4 border-b border-gray-100 last:border-0">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-medium text-gray-900">{title}</h3>
          <p className="text-sm text-gray-600 mt-1">{description}</p>
        </div>
        <div className={`flex items-center ${impact === 'positive' ? 'text-green-500' : 'text-red-500'}`}>
          {impact === 'positive' ? (
            <TrendingUp className="h-4 w-4 mr-1" />
          ) : (
            <TrendingDown className="h-4 w-4 mr-1" />
          )}
          <span className="font-medium">{value}</span>
        </div>
      </div>
    </div>
  );
}