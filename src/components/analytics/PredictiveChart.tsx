import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Calendar, TrendingUp } from 'lucide-react';

const FORECAST_DATA = [
  { month: 'Jan', actual: 65, predicted: 68 },
  { month: 'Feb', actual: 72, predicted: 75 },
  { month: 'Mar', actual: 80, predicted: 85 },
  { month: 'Apr', actual: 85, predicted: 92 },
  { month: 'May', actual: 92, predicted: 98 },
  { month: 'Jun', actual: null, predicted: 105 },
  { month: 'Jul', actual: null, predicted: 112 },
  { month: 'Aug', actual: null, predicted: 120 },
];

interface PredictiveChartProps {
  title: string;
  description: string;
}

export default function PredictiveChart({ title, description }: PredictiveChartProps) {
  const [timeframe, setTimeframe] = useState('3m');

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-sm text-gray-600 mt-1">{description}</p>
        </div>
        <select
          value={timeframe}
          onChange={(e) => setTimeframe(e.target.value)}
          className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        >
          <option value="1m">1 Month</option>
          <option value="3m">3 Months</option>
          <option value="6m">6 Months</option>
        </select>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={FORECAST_DATA} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="actual"
              stroke="#8b5cf6"
              strokeWidth={2}
              dot={{ fill: '#8b5cf6', strokeWidth: 2 }}
            />
            <Line
              type="monotone"
              dataKey="predicted"
              stroke="#e879f9"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={{ fill: '#e879f9', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center justify-between mt-6 text-sm">
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
            <span className="text-gray-600">Actual</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-pink-400 rounded-full mr-2"></div>
            <span className="text-gray-600">Predicted</span>
          </div>
        </div>
        <div className="flex items-center text-gray-600">
          <Calendar className="h-4 w-4 mr-1" />
          <span>Updated daily</span>
        </div>
      </div>
    </div>
  );
}