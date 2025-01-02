'use client';

import { useState, useRef } from 'react';
import axios from 'axios';

interface VisionBoard {
  _id: string;
  size: string;
  goals: string[];
  imageUrl: string;
  originalImageUrl: string;
  base64Image: string;
  createdAt: string;
}

export default function Home() {
  const [size, setSize] = useState('normal');
  const [goals, setGoals] = useState('');
  const [loading, setLoading] = useState(false);
  const [visionBoard, setVisionBoard] = useState<VisionBoard | null>(null);
  const [error, setError] = useState('');
  const abortControllerRef = useRef<AbortController | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Create new AbortController for this request
    abortControllerRef.current = new AbortController();

    try {
      // Split goals into array and filter out empty lines
      const goalsArray = goals
        .split('\n')
        .map(goal => goal.trim())
        .filter(goal => goal !== '');

      if (goalsArray.length === 0) {
        setError('Please enter at least one goal');
        setLoading(false);
        return;
      }

      const response = await axios.post(`${process.env.BACKEND_URL}/api/vision-board`, {
        size,
        goals: goalsArray
      }, {
        signal: abortControllerRef.current.signal
      });

      setVisionBoard(response.data);
    } catch (err: any) {
      if (axios.isCancel(err)) {
        setError('Request cancelled');
      } else {
        setError(err.response?.data?.message || 'Failed to create vision board. Please try again.');
        console.error('Error:', err);
      }
    } finally {
      setLoading(false);
      abortControllerRef.current = null;
    }
  };

  const handleCancel = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  };

  const handleDownload = async () => {
    if (!visionBoard?.imageUrl) return;
    
    try {
      // For base64 images, we can download directly
      const a = document.createElement('a');
      a.href = visionBoard.imageUrl;
      a.download = `vision-board-${new Date().toISOString().split('T')[0]}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (err) {
      console.error('Error downloading image:', err);
      setError('Failed to download vision board. Please try again.');
    }
  };

  // Helper function to get aspect ratio and max height classes
  const getImageContainerClasses = (size: string) => {
    switch (size) {
      case 'phone':
        return {
          aspect: 'aspect-[9/16]',
          container: 'max-w-[360px]' // This will make phone wallpaper 360x640
        };
      case 'laptop':
        return {
          aspect: 'aspect-[16/9]',
          container: 'w-full' // Full width for laptop
        };
      default:
        return {
          aspect: 'aspect-square',
          container: 'w-full' // Full width for square
        };
    }
  };

  return (
    <main className="min-h-screen p-8 bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-purple-800">
          2025 Vision Board Creator
        </h1>

        <div className="bg-white rounded-lg shadow-xl p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-2">
                Choose Your Vision Board Format
              </label>
              <p className="text-sm text-gray-600 mb-3">
                Select the perfect size for where you'll display your vision board
              </p>
              <select
                value={size}
                onChange={(e) => setSize(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 bg-white text-gray-900"
              >
                <option value="phone" className="text-gray-900">Phone Wallpaper (Vertical 9:16)</option>
                <option value="laptop" className="text-gray-900">Laptop Wallpaper (Horizontal 16:9)</option>
                <option value="normal" className="text-gray-900">Square Format (1:1)</option>
              </select>
              <p className="mt-2 text-sm text-gray-500">
                {size === 'phone' && 'Perfect for phone backgrounds and mobile device wallpapers'}
                {size === 'laptop' && 'Ideal for desktop and laptop computer wallpapers'}
                {size === 'normal' && 'Great for social media posts and general purpose'}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-800 mb-2">
                Envision Your 2025
              </label>
              <p className="text-sm text-gray-600 mb-3">
                What do you want to manifest in your life? Share your dreams, aspirations, and the life you want to create.
                Each line will be a piece of your vision board.
              </p>
              <textarea
                value={goals}
                onChange={(e) => setGoals(e.target.value)}
                rows={5}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 bg-white text-gray-900 placeholder-gray-500"
                placeholder="Example:
Living in my dream beach house
Building a successful online business
Traveling to exotic destinations
Maintaining a healthy lifestyle
Creating meaningful connections"
                required
              />
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50"
              >
                {loading ? 'Creating your vision board...' : 'Create Vision Board'}
              </button>
              {loading && (
                <button
                  type="button"
                  onClick={handleCancel}
                  className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>

          {error && (
            <div className="mt-4 text-red-600 text-center font-medium">
              {error}
            </div>
          )}

          {(loading || visionBoard) && (
            <div className="mt-8 border-t pt-8">
              <h2 className="text-2xl font-semibold text-center mb-4 text-gray-800">Your Vision Board</h2>
              
              <div className={`relative rounded-lg overflow-hidden shadow-lg mx-auto ${getImageContainerClasses(size).container}`}>
                <div className={`${getImageContainerClasses(size).aspect} bg-gray-50 relative`}>
                  {visionBoard && (
                    <img
                      src={visionBoard.imageUrl}
                      alt="Vision Board"
                      className="absolute inset-0 w-full h-full object-contain"
                    />
                  )}
                  
                  {loading && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                      <div className="text-center text-white px-4">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent mb-4"></div>
                        <div className="text-lg font-medium">Creating your vision board...</div>
                        <div className="text-sm mt-2">This may take a minute</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {visionBoard && !loading && (
                <div className="space-y-2 mt-4">
                  <button
                    onClick={handleDownload}
                    className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                  >
                    Download Vision Board
                  </button>
                  <a
                    href={visionBoard.originalImageUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center text-sm text-gray-600 hover:text-gray-800"
                  >
                    View Original Image
                  </a>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
