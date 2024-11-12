import { Star, Upload } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useBusinessStore } from '../store/businessStore';

export default function BusinessSetup() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const setProfile = useBusinessStore((state) => state.setProfile);
  const [businessData, setBusinessData] = useState({
    name: '',
    description: '',
    logo: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&h=200&q=80'
  });

  useEffect(() => {
    if (!user || user.accountType !== 'business') {
      navigate('/');
    }
  }, [user, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setBusinessData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setProfile({
      ...businessData,
      rating: 4.8,
      reviews: 0,
      sentiment: 85,
      views: 0
    });
    navigate('/business/dashboard');
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-lg shadow-sm p-8">
        <form onSubmit={handleSubmit}>
          <div className="flex items-center space-x-4 mb-8">
            <div className="relative w-24 h-24 bg-purple-100 rounded-lg overflow-hidden">
              <img
                src={businessData.logo}
                alt="Business"
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white opacity-0 hover:opacity-100 transition-opacity"
              >
                <Upload className="h-6 w-6" />
              </button>
            </div>
            <div className="flex-1">
              <input
                type="text"
                name="name"
                value={businessData.name}
                onChange={handleInputChange}
                placeholder="Business Name"
                className="w-full text-2xl font-bold text-gray-900 bg-transparent border-b border-gray-300 focus:border-purple-500 focus:ring-0"
                required
              />
              <textarea
                name="description"
                value={businessData.description}
                onChange={handleInputChange}
                placeholder="Business Description"
                className="w-full mt-2 text-gray-600 bg-transparent border-b border-gray-300 focus:border-purple-500 focus:ring-0 resize-none"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6 mb-8">
            <div className="bg-purple-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-purple-600 flex items-center justify-center">
                <Star className="h-5 w-5 fill-current mr-1" />
                4.8
              </div>
              <div className="text-sm text-gray-600">0 reviews</div>
            </div>
            <div className="bg-purple-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">85%</div>
              <div className="text-sm text-gray-600">Positive Sentiment</div>
            </div>
            <div className="bg-purple-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">0</div>
              <div className="text-sm text-gray-600">Total Views</div>
            </div>
          </div>

          <div className="border-b border-gray-200 mb-8">
            <nav className="-mb-px flex space-x-8">
              <button
                type="button"
                className="border-purple-500 text-purple-600 whitespace-nowrap pb-4 px-1 border-b-2 font-medium"
              >
                Reviews
              </button>
              <button
                type="button"
                className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap pb-4 px-1 border-b-2 font-medium"
              >
                About
              </button>
            </nav>
          </div>

          <div className="text-center py-12">
            <button
              type="submit"
              className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 font-medium"
            >
              Complete Setup
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}