import { useState } from 'react';
import { ChevronDown, ChevronUp, Star } from 'lucide-react';

interface Lead {
  name: string;
  company: string;
  score: number;
  watched: number;
  demoClicks: number;
  lastActive: string;
}

const DEMO_LEADS: Lead[] = [
  {
    name: "Sarah Johnson",
    company: "TechCorp Inc",
    score: 92,
    watched: 8,
    demoClicks: 3,
    lastActive: "2h ago"
  },
  {
    name: "Michael Chen",
    company: "Innovation Labs",
    score: 88,
    watched: 6,
    demoClicks: 2,
    lastActive: "4h ago"
  },
  {
    name: "Emma Davis",
    company: "Growth Solutions",
    score: 85,
    watched: 5,
    demoClicks: 2,
    lastActive: "1d ago"
  },
  {
    name: "James Wilson",
    company: "Digital Dynamics",
    score: 82,
    watched: 4,
    demoClicks: 1,
    lastActive: "2d ago"
  },
  {
    name: "Lisa Anderson",
    company: "Future Systems",
    score: 78,
    watched: 3,
    demoClicks: 1,
    lastActive: "3d ago"
  }
];

export default function LeadTable() {
  const [sortField, setSortField] = useState<keyof Lead>('score');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  const handleSort = (field: keyof Lead) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const sortedLeads = [...DEMO_LEADS].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];
    const direction = sortDirection === 'asc' ? 1 : -1;
    return (aValue < bValue ? -1 : 1) * direction;
  });

  const SortIcon = ({ field }: { field: keyof Lead }) => {
    if (field !== sortField) return null;
    return sortDirection === 'asc' ? (
      <ChevronUp className="h-4 w-4" />
    ) : (
      <ChevronDown className="h-4 w-4" />
    );
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="pb-3 text-left text-sm font-medium text-gray-500">
              <button
                className="flex items-center space-x-1"
                onClick={() => handleSort('name')}
              >
                <span>Lead</span>
                <SortIcon field="name" />
              </button>
            </th>
            <th className="pb-3 text-left text-sm font-medium text-gray-500">
              <button
                className="flex items-center space-x-1"
                onClick={() => handleSort('score')}
              >
                <span>Score</span>
                <SortIcon field="score" />
              </button>
            </th>
            <th className="pb-3 text-left text-sm font-medium text-gray-500">
              <button
                className="flex items-center space-x-1"
                onClick={() => handleSort('watched')}
              >
                <span>Watched</span>
                <SortIcon field="watched" />
              </button>
            </th>
            <th className="pb-3 text-left text-sm font-medium text-gray-500">
              <button
                className="flex items-center space-x-1"
                onClick={() => handleSort('demoClicks')}
              >
                <span>Demo Clicks</span>
                <SortIcon field="demoClicks" />
              </button>
            </th>
            <th className="pb-3 text-left text-sm font-medium text-gray-500">Last Active</th>
          </tr>
        </thead>
        <tbody>
          {sortedLeads.map((lead, i) => (
            <tr key={i} className="border-b border-gray-100 last:border-0">
              <td className="py-4">
                <div>
                  <div className="font-medium text-gray-900">{lead.name}</div>
                  <div className="text-sm text-gray-500">{lead.company}</div>
                </div>
              </td>
              <td className="py-4">
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="ml-1 font-medium">{lead.score}</span>
                </div>
              </td>
              <td className="py-4">
                <span className="font-medium">{lead.watched}</span>
                <span className="text-gray-500"> reviews</span>
              </td>
              <td className="py-4">
                <span className="font-medium">{lead.demoClicks}</span>
                <span className="text-gray-500"> clicks</span>
              </td>
              <td className="py-4 text-gray-500">{lead.lastActive}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}