import { Layout, PalmtreeIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Trustworthy reviews in seconds
        </h1>
        <div className="max-w-xl mx-auto">
          <input
            type="text"
            placeholder="Search reviews, companies, or categories..."
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
          Explore Categories
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          <Link
            to="/category/software"
            className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-purple-900 to-purple-700 p-8 text-white transition-all hover:shadow-lg"
          >
            <div className="relative z-10">
              <Layout className="h-8 w-8 mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                Software & Business Solutions
              </h3>
              <p className="text-purple-100">
                Explore reviews for B2B software, services, and solutions
              </p>
              <button className="mt-4 bg-white text-purple-700 px-6 py-2 rounded-lg font-medium hover:bg-purple-50">
                View B2B Reviews
              </button>
            </div>
          </Link>

          <Link
            to="/category/lifestyle"
            className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-purple-700 to-pink-600 p-8 text-white transition-all hover:shadow-lg"
          >
            <div className="relative z-10">
              <PalmtreeIcon className="h-8 w-8 mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                Lifestyle & Travel
              </h3>
              <p className="text-purple-100">
                Discover reviews for travel, products, and experiences
              </p>
              <button className="mt-4 bg-white text-purple-700 px-6 py-2 rounded-lg font-medium hover:bg-purple-50">
                View Lifestyle Reviews
              </button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}