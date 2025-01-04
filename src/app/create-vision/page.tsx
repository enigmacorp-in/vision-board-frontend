'use client';

import { useState } from 'react';
import axios from 'axios';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Montserrat, Playfair_Display } from 'next/font/google';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';

const montserrat = Montserrat({ subsets: ['latin'] });
const playfair = Playfair_Display({ subsets: ['latin'] });

interface VisionBoard {
  _id: string;
  goals: string[];
  imageUrl: string;
  createdAt: string;
}

export default function CreateVisionBoard() {
  const router = useRouter();
  const [goals, setGoals] = useState<string[]>(['']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [visionBoard, setVisionBoard] = useState<VisionBoard | null>(null);

  const addGoal = () => {
    setGoals([...goals, '']);
  };

  const removeGoal = (index: number) => {
    const newGoals = goals.filter((_, i) => i !== index);
    setGoals(newGoals);
  };

  const updateGoal = (index: number, value: string) => {
    const newGoals = [...goals];
    newGoals[index] = value;
    setGoals(newGoals);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const nonEmptyGoals = goals.filter(goal => goal.trim());
      if (nonEmptyGoals.length === 0) {
        throw new Error('Please add at least one goal');
      }

      const response = await axios.post<VisionBoard>(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/vision-board`, {
        goals: nonEmptyGoals,
      });

      setVisionBoard(response.data);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 429) {
          const resetTime = new Date(err.response.data.nextAllowedRequest * 1000);
          const waitMinutes = Math.ceil((resetTime.getTime() - Date.now()) / 60000);
          setError(`Rate limit exceeded. Please wait ${waitMinutes} minute${waitMinutes > 1 ? 's' : ''} before trying again.`);
        } else {
          setError(err.response?.data?.message || err.message || 'Something went wrong');
        }
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  const downloadImage = async () => {
    if (!visionBoard) return;
    
    window.open(visionBoard.imageUrl, '_blank');
  };

  const LoadingAnimation = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <motion.div 
        className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full mx-4"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
      >
        <div className="text-center">
          <div className="mb-6">
            <motion.div
              className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full mx-auto"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Creating Your Vision Board</h3>
          <p className="text-gray-600">
            Our AI is carefully crafting your vision board...
          </p>
        </div>
      </motion.div>
    </div>
  );

  return (
    <div className={`min-h-screen flex flex-col ${montserrat.className}`}>
      <Header />
      
      <main className="flex-grow bg-gradient-to-b from-purple-50 to-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-8">
            <button
              onClick={() => router.back()}
              className="text-purple-700 hover:text-purple-800 flex items-center gap-2 mb-6 font-medium"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back
            </button>
            <h1 className={`${playfair.className} text-4xl font-bold text-gray-800 mb-4`}>
              Create Your Vision Board
            </h1>
            <p className="text-gray-700 text-lg font-medium">
              Transform your goals and aspirations into a beautiful vision board.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <label className="block text-lg font-semibold mb-4 text-gray-800">Your Goals</label>
                <div className="space-y-4">
                  {goals.map((goal, index) => (
                    <div key={index} className="flex gap-2">
                      <textarea
                        value={goal}
                        onChange={(e) => updateGoal(index, e.target.value)}
                        placeholder="Enter your goal..."
                        className="flex-grow p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-700 placeholder-gray-500"
                      />
                      {goals.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeGoal(index)}
                          className="p-2 text-red-500 hover:text-red-600"
                        >
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={addGoal}
                  className="mt-4 text-purple-600 hover:text-purple-700 font-medium flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add Another Goal
                </button>
              </div>

              {error && (
                <div className={`p-4 rounded-lg ${
                  error.includes('Rate limit') 
                    ? 'bg-yellow-50 text-yellow-800 border border-yellow-200'
                    : 'bg-red-50 text-red-600'
                }`}>
                  <div className="flex items-center gap-2">
                    {error.includes('Rate limit') && (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    )}
                    {error}
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-4 px-8 rounded-lg text-white font-semibold text-lg transition-colors ${
                  loading ? 'bg-purple-400 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-700'
                }`}
              >
                {loading ? 'Creating Your Vision Board...' : 'Create Vision Board'}
              </button>
            </form>

            {visionBoard && (
              <div className="mt-12 space-y-6">
                <h3 className="text-2xl font-bold text-center mb-6 text-gray-800">Your Vision Board</h3>
                <div className="relative rounded-lg overflow-hidden shadow-xl aspect-[4/3]">
                  <Image
                    src={visionBoard.imageUrl}
                    alt="Your Vision Board"
                    fill
                    className="object-cover"
                    unoptimized // Since we're using external URLs
                  />
                </div>
                <div className="flex justify-center">
                  <button
                    onClick={downloadImage}
                    className="bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition-colors shadow-md font-medium"
                  >
                    Download Vision Board
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />

      {loading && <LoadingAnimation />}
    </div>
  );
} 