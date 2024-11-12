import { useState } from 'react';
import { Upload, Play, X, Star, TrendingUp, Users, Video, Plus, BarChart } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useBusinessStore } from '../store/businessStore';
import BusinessAnalytics from '../components/analytics/BusinessAnalytics';

export default function BusinessDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'analytics'>('overview');
  const profile = useBusinessStore((state) => state.profile);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadData, setUploadData] = useState({
    video: null as File | null,
    preview: '',
    title: '',
    description: '',
    tags: '',
    category: ''
  });

  const stats = [
    { label: 'Rating', value: profile?.rating || 0, icon: Star, color: 'text-yellow-500' },
    { label: 'Reviews', value: profile?.reviews || 0, icon: Users, color: 'text-blue-500' },
    { label: 'Sentiment', value: `${profile?.sentiment || 0}%`, icon: TrendingUp, color: 'text-green-500' },
    { label: 'Total Views', value: profile?.views || 0, icon: Video, color: 'text-purple-500' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-4">
              <Link to="/" className="text-gray-600 hover:text-gray-900">
                ← Back to Categories
              </Link>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mt-4">{profile?.name}</h1>
            <p className="text-gray-600 mt-1">{profile?.description}</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex bg-white rounded-lg p-1 shadow-sm">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'overview'
                    ? 'bg-purple-100 text-purple-700'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('analytics')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'analytics'
                    ? 'bg-purple-100 text-purple-700'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <span className="flex items-center">
                  <BarChart className="h-4 w-4 mr-1" />
                  Analytics
                </span>
              </button>
            </div>
            <button
              onClick={() => setIsUploading(true)}
              className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
            >
              <Plus className="h-5 w-5" />
              <span>Upload Webinar</span>
            </button>
          </div>
        </div>

        {activeTab === 'overview' ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
              {stats.map((stat) => (
                <div key={stat.label} className="bg-white rounded-lg p-6 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">{stat.label}</p>
                      <p className="text-2xl font-semibold mt-1">{stat.value}</p>
                    </div>
                    <stat.icon className={`h-8 w-8 ${stat.color}`} />
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Webinars */}
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-6">Recent Webinars</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[1, 2, 3].map((_, i) => (
                  <div key={i} className="bg-white rounded-lg overflow-hidden shadow-sm">
                    <div className="aspect-video bg-gray-100 relative">
                      <img
                        src={`https://images.unsplash.com/photo-${i + 1}?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80`}
                        alt="Webinar thumbnail"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                        <Play className="h-12 w-12 text-white" />
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900">Sample Webinar {i + 1}</h3>
                      <p className="text-sm text-gray-600 mt-1">Posted 2 days ago • 45 mins</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="mt-8">
            <BusinessAnalytics />
          </div>
        )}
      </div>

      {/* Upload Modal */}
      {isUploading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            {/* ... existing upload modal content ... */}
          </div>
        </div>
      )}
    </div>
  );
}