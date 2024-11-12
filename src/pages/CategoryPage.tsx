import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Heart, MessageSquare } from 'lucide-react';

const DEMO_REVIEWS = [
  {
    id: 1,
    title: 'Monday.com Project Management Review',
    image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80',
    views: 12500,
    likes: 842,
    comments: 156,
    duration: '3:45'
  },
  {
    id: 2,
    title: 'HubSpot CRM Deep Dive',
    image: 'https://images.unsplash.com/photo-1531973576160-7125cd663d86?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80',
    views: 8300,
    likes: 567,
    comments: 89,
    duration: '4:20'
  }
];

export default function CategoryPage() {
  const { category } = useParams();
  const [selectedRating, setSelectedRating] = useState('');
  const [selectedSentiment, setSelectedSentiment] = useState('');

  const title = category === 'software' 
    ? 'Software & Business Solutions'
    : 'Lifestyle Inspirations';

  const categories = category === 'software'
    ? ['Project Management', 'CRM', 'Marketing', 'Accounting']
    : ['Travel', 'Fashion', 'Food', 'Fitness'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center space-x-4 mb-8">
        <Link to="/" className="text-gray-600 hover:text-gray-900">
          ← Back to Categories
        </Link>
        <div className="flex-1" />
        {categories.map((cat) => (
          <button
            key={cat}
            className="text-gray-600 hover:text-gray-900"
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="flex gap-8">
        <div className="w-64 space-y-8">
          <div>
            <h3 className="font-medium mb-4">Sentiment</h3>
            <div className="space-y-2">
              {['Positive', 'Neutral', 'Negative'].map((sentiment) => (
                <label key={sentiment} className="flex items-center">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                    checked={selectedSentiment === sentiment}
                    onChange={() => setSelectedSentiment(sentiment)}
                  />
                  <span className="ml-2 text-gray-700">{sentiment}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-4">Rating</h3>
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((rating) => (
                <label key={rating} className="flex items-center">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                    checked={selectedRating === rating.toString()}
                    onChange={() => setSelectedRating(rating.toString())}
                  />
                  <span className="ml-2 flex items-center text-gray-700">
                    {Array(rating).fill(0).map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                    <span className="ml-1">& up</span>
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-4">Sort By</h3>
            <select className="w-full rounded-md border-gray-300 focus:border-purple-500 focus:ring-purple-500">
              <option>Most Recent</option>
              <option>Most Popular</option>
              <option>Highest Rated</option>
            </select>
          </div>
        </div>

        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">{title}</h1>
            <div className="relative">
              <input
                type="text"
                placeholder={`Search ${title}...`}
                className="w-64 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {DEMO_REVIEWS.map((review) => (
              <div key={review.id} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="relative">
                  <img
                    src={review.image}
                    alt={review.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded">
                    {review.duration}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2">{review.title}</h3>
                  <div className="flex items-center text-sm text-gray-600">
                    <span>{review.views.toLocaleString()} views</span>
                    <div className="flex items-center ml-4">
                      <Heart className="h-4 w-4 mr-1" />
                      {review.likes}
                    </div>
                    <div className="flex items-center ml-4">
                      <MessageSquare className="h-4 w-4 mr-1" />
                      {review.comments}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}