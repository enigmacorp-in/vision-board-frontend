'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Montserrat, Playfair_Display } from 'next/font/google';
import { motion } from 'framer-motion';

const montserrat = Montserrat({ subsets: ['latin'] });
const playfair = Playfair_Display({ subsets: ['latin'] });

interface VisionBoard {
  _id: string;
  size: string;
  goals: string[];
  imageUrl: string;
  originalImageUrl: string;
  createdAt: string;
}

export default function Gallery() {
  const [visionBoards, setVisionBoards] = useState<VisionBoard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchVisionBoards();
  }, []);

  const fetchVisionBoards = async () => {
    try {
      const response = await axios.get(`${process.env.BACKEND_URL}/api/vision-board`);
      setVisionBoards(response.data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className={`min-h-screen flex flex-col ${montserrat.className}`}>
      <Header />
      
      <main className="flex-grow bg-gradient-to-b from-purple-50 to-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className={`${playfair.className} text-4xl font-bold text-gray-800 mb-8`}>
            Vision Board Gallery
          </h1>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <motion.div
                className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
            </div>
          ) : error ? (
            <div className="text-red-600 bg-red-50 p-4 rounded-lg">
              {error}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {visionBoards.map((board) => (
                <motion.div
                  key={board._id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="relative aspect-square">
                    <img
                      src={board.imageUrl}
                      alt="Vision Board"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="mb-4">
                      <h3 className="text-lg font-bold text-gray-800 mb-2">Goals:</h3>
                      <ul className="space-y-2">
                        {board.goals.map((goal, index) => (
                          <li key={index} className="text-gray-700 flex items-start">
                            <span className="text-purple-600 mr-2">•</span>
                            {goal}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex justify-between items-center text-sm text-gray-600">
                      <span>Size: {board.size}</span>
                      <span>{formatDate(board.createdAt)}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {!loading && visionBoards.length === 0 && (
            <div className="text-center py-20">
              <h3 className="text-xl font-bold text-gray-800 mb-4">No Vision Boards Yet</h3>
              <p className="text-gray-600 mb-8">Start creating your first vision board!</p>
              <a
                href="/create"
                className="bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition-colors shadow-md font-medium"
              >
                Create Vision Board
              </a>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
} 