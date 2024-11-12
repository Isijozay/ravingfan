import { Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import AuthModal from './AuthModal';
import { useState } from 'react';

export default function Navbar() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Star className="h-8 w-8 text-purple-600" />
              <span className="text-xl font-semibold text-purple-600">RavingFans</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsAuthOpen(true)}
              className="text-gray-600 hover:text-gray-900"
            >
              Sign In
            </button>
            <button
              onClick={() => setIsAuthOpen(true)}
              className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </nav>
  );
}