'use client';

import { useState } from 'react';
import axios from 'axios';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Montserrat, Playfair_Display } from 'next/font/google';
import { motion } from 'framer-motion';

const montserrat = Montserrat({ subsets: ['latin'] });
const playfair = Playfair_Display({ subsets: ['latin'] });

interface FeedbackSubmission {
  email: string;
  suggestion: string;
}

interface ErrorResponse {
  message: string;
}

export default function About() {
  const [email, setEmail] = useState('');
  const [suggestion, setSuggestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      if (!email.trim() || !suggestion.trim()) {
        throw new Error('Please fill in all fields');
      }

      const response = await axios.post<FeedbackSubmission>(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/feedback`, {
        email: email.trim(),
        suggestion: suggestion.trim(),
      });

      setSuccess(true);
      setEmail('');
      setSuggestion('');
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || err.message || 'Failed to submit feedback');
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen flex flex-col ${montserrat.className}`}>
      <Header />
      
      <main className="flex-grow bg-gradient-to-b from-purple-50 to-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12 text-center">
            <h1 className={`${playfair.className} text-4xl font-bold text-gray-800 mb-4`}>
              About Enigma AI
            </h1>
            <p className="text-gray-700 text-lg max-w-3xl mx-auto">
              We&apos;re on a mission to make AI-powered visual creation accessible to everyone.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Mission</h2>
              <p className="text-gray-600 leading-relaxed">
                At Enigma AI, we believe in the power of visualization. We&apos;re dedicated to providing cutting-edge AI tools that help you transform your ideas into stunning visuals, whether it&apos;s creating vision boards or generating unique images from text descriptions.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">What We Offer</h2>
              <ul className="space-y-4 text-gray-600">
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-purple-600 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>AI-powered vision board creation to visualize your goals</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-purple-600 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Text-to-image generation for unique visual content</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-purple-600 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>High-quality image generation with advanced AI models</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Share Your Feedback</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="suggestion" className="block text-gray-700 font-medium mb-2">
                    Your Suggestion
                  </label>
                  <textarea
                    id="suggestion"
                    value={suggestion}
                    onChange={(e) => setSuggestion(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent min-h-[120px]"
                    placeholder="Share your thoughts or suggestions..."
                  />
                </div>

                {error && (
                  <div className="p-4 bg-red-50 text-red-600 rounded-lg">
                    {error}
                  </div>
                )}

                {success && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-green-50 text-green-600 rounded-lg flex items-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Thank you for your feedback!
                  </motion.div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-3 rounded-lg text-white font-medium transition-colors ${
                    loading ? 'bg-purple-400' : 'bg-purple-600 hover:bg-purple-700'
                  }`}
                >
                  {loading ? 'Submitting...' : 'Submit Feedback'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
} 