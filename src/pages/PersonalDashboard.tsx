import { useState } from 'react';
import { Star, Upload, Play, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const BUSINESS_CATEGORIES = [
  { value: 'software', label: 'Software & Tools' },
  { value: 'services', label: 'Professional Services' },
  { value: 'consulting', label: 'Consulting' },
  { value: 'finance', label: 'Financial Services' },
  { value: 'marketing', label: 'Marketing Solutions' },
  { value: 'enterprise', label: 'Enterprise Solutions' }
];

const LIFESTYLE_CATEGORIES = [
  { value: 'travel', label: 'Travel & Tourism' },
  { value: 'food', label: 'Food & Dining' },
  { value: 'fitness', label: 'Health & Fitness' },
  { value: 'fashion', label: 'Fashion & Style' },
  { value: 'tech', label: 'Consumer Tech' },
  { value: 'entertainment', label: 'Entertainment' }
];

interface UploadData {
  video: File | null;
  preview: string;
  title: string;
  description: string;
  category: string;
  rating: number;
  type: 'business' | 'lifestyle';
}

export default function PersonalDashboard() {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadData, setUploadData] = useState<UploadData>({
    video: null,
    preview: '',
    title: '',
    description: '',
    category: '',
    rating: 0,
    type: 'business'
  });

  const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadData(prev => ({
        ...prev,
        video: file,
        preview: URL.createObjectURL(file)
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle review submission
    console.log('Submitting review:', uploadData);
    setIsUploading(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <Link to="/" className="text-gray-600 hover:text-gray-900">
            ← Back to Categories
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 mt-4">My Reviews</h1>
        </div>
        <button
          onClick={() => setIsUploading(true)}
          className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 flex items-center space-x-2"
        >
          <Upload className="h-5 w-5" />
          <span>Create Review</span>
        </button>
      </div>

      {/* Recent Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((_, i) => (
          <div key={i} className="bg-white rounded-lg overflow-hidden shadow-sm">
            <div className="aspect-video bg-gray-100 relative">
              <img
                src={`https://images.unsplash.com/photo-${i + 1}?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80`}
                alt="Review thumbnail"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                <Play className="h-12 w-12 text-white" />
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-900">Sample Review {i + 1}</h3>
              <p className="text-sm text-gray-600 mt-1">Posted 2 days ago • 45 mins</p>
            </div>
          </div>
        ))}
      </div>

      {/* Upload Modal */}
      {isUploading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Create New Review</h2>
                <button
                  onClick={() => setIsUploading(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Review Type
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setUploadData(prev => ({ ...prev, type: 'business' }))}
                        className={`px-4 py-2 text-sm font-medium rounded-lg ${
                          uploadData.type === 'business'
                            ? 'bg-purple-100 text-purple-700 border-purple-200 border'
                            : 'bg-gray-50 text-gray-600 border-gray-200 border hover:bg-gray-100'
                        }`}
                      >
                        Business
                      </button>
                      <button
                        type="button"
                        onClick={() => setUploadData(prev => ({ ...prev, type: 'lifestyle' }))}
                        className={`px-4 py-2 text-sm font-medium rounded-lg ${
                          uploadData.type === 'lifestyle'
                            ? 'bg-purple-100 text-purple-700 border-purple-200 border'
                            : 'bg-gray-50 text-gray-600 border-gray-200 border hover:bg-gray-100'
                        }`}
                      >
                        Lifestyle
                      </button>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                      Category
                    </label>
                    <select
                      id="category"
                      value={uploadData.category}
                      onChange={(e) => setUploadData(prev => ({ ...prev, category: e.target.value }))}
                      className="w-full rounded-lg border-gray-300 focus:ring-purple-500 focus:border-purple-500"
                      required
                    >
                      <option value="">Select a category</option>
                      {uploadData.type === 'business' ? (
                        <optgroup label="Business Reviews">
                          {BUSINESS_CATEGORIES.map(cat => (
                            <option key={cat.value} value={cat.value}>
                              {cat.label}
                            </option>
                          ))}
                        </optgroup>
                      ) : (
                        <optgroup label="Lifestyle Reviews">
                          {LIFESTYLE_CATEGORIES.map(cat => (
                            <option key={cat.value} value={cat.value}>
                              {cat.label}
                            </option>
                          ))}
                        </optgroup>
                      )}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    value={uploadData.title}
                    onChange={(e) => setUploadData(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full rounded-lg border-gray-300 focus:ring-purple-500 focus:border-purple-500"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    id="description"
                    value={uploadData.description}
                    onChange={(e) => setUploadData(prev => ({ ...prev, description: e.target.value }))}
                    rows={4}
                    className="w-full rounded-lg border-gray-300 focus:ring-purple-500 focus:border-purple-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Rating
                  </label>
                  <div className="flex items-center space-x-2">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <button
                        key={rating}
                        type="button"
                        onClick={() => setUploadData(prev => ({ ...prev, rating }))}
                        className="focus:outline-none"
                      >
                        <Star
                          className={`h-6 w-6 ${
                            rating <= uploadData.rating
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload Video Review
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                    <div className="space-y-1 text-center">
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="flex text-sm text-gray-600">
                        <label
                          htmlFor="video-upload"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-purple-600 hover:text-purple-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-purple-500"
                        >
                          <span>Upload a video</span>
                          <input
                            id="video-upload"
                            name="video-upload"
                            type="file"
                            accept="video/*"
                            className="sr-only"
                            onChange={handleVideoUpload}
                            required
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">
                        MP4, WebM up to 10 minutes
                      </p>
                    </div>
                  </div>
                </div>

                {uploadData.preview && (
                  <div>
                    <video
                      src={uploadData.preview}
                      controls
                      className="w-full rounded-lg"
                    >
                      Your browser does not support the video tag.
                    </video>
                  </div>
                )}

                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setIsUploading(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700"
                  >
                    Upload Review
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}