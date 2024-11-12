import { Activity, Users, TrendingUp, Video, Flame } from 'lucide-react';
import StatCard from './StatCard';
import PredictiveChart from './PredictiveChart';
import InsightCard from './InsightCard';
import LeadTable from './LeadTable';

export default function BusinessAnalytics() {
  const analyticsStats = [
    {
      label: 'Total Views',
      value: '15.2K',
      trend: 12,
      icon: Activity,
      color: 'text-blue-500'
    },
    {
      label: 'Engagement',
      value: '8.7K',
      trend: 8,
      icon: Users,
      color: 'text-green-500'
    },
    {
      label: 'Growth Rate',
      value: '24%',
      trend: 15,
      icon: TrendingUp,
      color: 'text-purple-500'
    },
    {
      label: 'Hot Leads',
      value: '127',
      trend: 32,
      icon: Flame,
      color: 'text-orange-500'
    }
  ];

  const insights = [
    {
      title: 'Lead Conversion Rate',
      description: 'Demo requests increased by 23% this month',
      impact: 'positive' as const,
      value: '+23%'
    },
    {
      title: 'Content Engagement',
      description: 'Average watch time improved to 42 minutes',
      impact: 'positive' as const,
      value: '+18%'
    },
    {
      title: 'Lead Quality Score',
      description: 'High-intent leads showing strong engagement',
      impact: 'positive' as const,
      value: '92%'
    }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold mb-6">Analytics Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {analyticsStats.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PredictiveChart
          title="Audience Growth"
          description="Viewer growth and engagement trends"
        />
        <PredictiveChart
          title="Lead Generation"
          description="Lead acquisition and conversion rates"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-6">Hot Leads</h2>
            <LeadTable />
          </div>
        </div>
        <div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-6">Key Insights</h2>
            <div className="space-y-4">
              {insights.map((insight) => (
                <InsightCard key={insight.title} {...insight} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}