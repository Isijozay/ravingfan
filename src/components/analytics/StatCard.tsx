import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string | number;
  trend: number;
  icon: LucideIcon;
  color: string;
}

export default function StatCard({ label, value, trend, icon: Icon, color }: StatCardProps) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <Icon className={`h-8 w-8 ${color}`} />
        <div className={`text-sm font-medium ${trend > 0 ? 'text-green-500' : 'text-red-500'}`}>
          {trend > 0 ? '+' : ''}{trend}%
        </div>
      </div>
      <p className="text-sm text-gray-600">{label}</p>
      <p className="text-2xl font-semibold mt-1">{value}</p>
    </div>
  );
}