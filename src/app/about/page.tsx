'use client';

import { useState } from 'react';
import axios from 'axios';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Montserrat, Playfair_Display } from 'next/font/google';
import { motion } from 'framer-motion';
import Image from 'next/image';

const montserrat = Montserrat({ subsets: ['latin'] });
const playfair = Playfair_Display({ subsets: ['latin'] });

interface FeedbackSubmission {
  email: string;
  suggestion: string;
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

      await axios.post<FeedbackSubmission>(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/feedback`, {
        email: email.trim(),
        suggestion: suggestion.trim()
      });

      setSuccess(true);
      setEmail('');
      setSuggestion('');
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || err.message || 'Something went wrong');
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
          {/* Hero Section with AI Visual */}
          <section className="mb-16 relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-900 to-indigo-900 text-white p-12">
            <div className="relative z-10">
              <h1 className={`${playfair.className} text-5xl font-bold mb-6`}>
                About Enigma AI
              </h1>
              <p className="text-xl text-purple-100 max-w-2xl">
                Harnessing the power of artificial intelligence to transform your creative vision into reality.
              </p>
            </div>
            {/* Decorative gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-purple-900/20" />
          </section>
          
          {/* About Section with Visual Elements */}
          <section className="mb-16">
            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Mission</h2>
                  <p className="text-gray-600 leading-relaxed">
                    At Enigma AI, we&apos;re passionate about democratizing artificial intelligence and making it accessible to everyone. 
                    Our platform combines cutting-edge AI technology with an intuitive interface to help you bring your creative visions to life.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">What We Offer</h2>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start">
                      <svg className="w-6 h-6 text-purple-600 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Vision Board Creation - Transform your goals into inspiring visual boards</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-6 h-6 text-purple-600 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Text to Image Generation - Convert your ideas into stunning visuals</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-6 h-6 text-purple-600 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>High-Quality Results - Powered by state-of-the-art AI models</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Technology Showcase with Visual Elements */}
              <div className="space-y-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Technology</h2>
                <div className="grid grid-cols-2 gap-6">
                  <div className="relative group overflow-hidden rounded-xl shadow-lg aspect-square">
                    <Image
                      src="https://vision-board-s3.s3.us-west-1.amazonaws.com/website-images/nlp.jpg?AWSAccessKeyId=AKIAUEP6FBWC53U2XYX2&Expires=1830628136&Signature=NWnjFtPSk%2FYQArYDSEkj8Hdwc4c%3D"
                      alt="Natural Language Processing"
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-purple-900/90 via-purple-900/50 to-transparent p-6 flex flex-col justify-end">
                      <h3 className="font-bold text-white text-xl mb-2">Natural Language Processing</h3>
                      <p className="text-purple-100 text-sm">Understanding and processing human language to generate accurate prompts</p>
                    </div>
                  </div>

                  <div className="relative group overflow-hidden rounded-xl shadow-lg aspect-square">
                    <Image
                      src="https://vision-board-s3.s3.us-west-1.amazonaws.com/website-images/computer-vision.avif?AWSAccessKeyId=AKIAUEP6FBWC53U2XYX2&Expires=1830628215&Signature=4QayJeVs%2Fy7gFN1lzmo0gBcKzno%3D"
                      alt="Computer Vision"
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-purple-900/90 via-purple-900/50 to-transparent p-6 flex flex-col justify-end">
                      <h3 className="font-bold text-white text-xl mb-2">Computer Vision</h3>
                      <p className="text-purple-100 text-sm">Advanced image generation and processing capabilities</p>
                    </div>
                  </div>

                  <div className="relative group overflow-hidden rounded-xl shadow-lg aspect-square">
                    <Image
                      src="https://vision-board-s3.s3.us-west-1.amazonaws.com/website-images/deep-learning.jpg?AWSAccessKeyId=AKIAUEP6FBWC53U2XYX2&Expires=1830628264&Signature=8pCocNtlupJr8RhzAg9QAozknvk%3D"
                      alt="Deep Learning"
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-purple-900/90 via-purple-900/50 to-transparent p-6 flex flex-col justify-end">
                      <h3 className="font-bold text-white text-xl mb-2">Deep Learning</h3>
                      <p className="text-purple-100 text-sm">Sophisticated neural networks for high-quality image generation</p>
                    </div>
                  </div>

                  <div className="relative group overflow-hidden rounded-xl shadow-lg aspect-square">
                    <Image
                      src="https://vision-board-s3.s3.us-west-1.amazonaws.com/website-images/neural-network.png?AWSAccessKeyId=AKIAUEP6FBWC53U2XYX2&Expires=1830628309&Signature=cqXnjjHbeT3UMajeFUZlY%2BfG7Tg%3D"
                      alt="Neural Networks"
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-purple-900/90 via-purple-900/50 to-transparent p-6 flex flex-col justify-end">
                      <h3 className="font-bold text-white text-xl mb-2">Neural Networks</h3>
                      <p className="text-purple-100 text-sm">State-of-the-art AI models for creative generation</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Feedback Form Section */}
          <section className="max-w-3xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-12 mb-16 relative overflow-hidden">
              {/* Decorative background elements */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-purple-100 rounded-full -mr-20 -mt-20 opacity-50" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-100 rounded-full -ml-16 -mb-16 opacity-50" />
              
              <div className="relative">
                <h2 className={`${playfair.className} text-3xl font-bold text-gray-800 mb-4 text-center`}>
                  Share Your Feedback
                </h2>
                <p className="text-gray-600 mb-8 text-center max-w-xl mx-auto">
                  We&apos;re constantly working to improve our services. Your feedback helps us create a better experience for everyone.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="group">
                    <label htmlFor="email" className="block text-gray-700 font-medium mb-2 transition-colors group-focus-within:text-purple-600">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 outline-none text-gray-700 bg-gray-50 focus:bg-white"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div className="group">
                    <label htmlFor="suggestion" className="block text-gray-700 font-medium mb-2 transition-colors group-focus-within:text-purple-600">
                      Your Suggestion
                    </label>
                    <textarea
                      id="suggestion"
                      value={suggestion}
                      onChange={(e) => setSuggestion(e.target.value)}
                      className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 outline-none text-gray-700 bg-gray-50 focus:bg-white min-h-[150px] resize-y"
                      placeholder="Share your thoughts, suggestions, or feature requests..."
                    />
                  </div>

                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-red-50 text-red-600 rounded-xl border border-red-100 flex items-center"
                    >
                      <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{error}</span>
                    </motion.div>
                  )}

                  {success && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-green-50 text-green-600 rounded-xl border border-green-100 flex items-center"
                    >
                      <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Thank you for your feedback! We&apos;ll review it carefully.</span>
                    </motion.div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-4 px-6 rounded-xl text-white font-semibold text-lg transition-all duration-200 ${
                      loading 
                        ? 'bg-purple-400 cursor-not-allowed' 
                        : 'bg-purple-600 hover:bg-purple-700 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0'
                    }`}
                  >
                    {loading ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Submitting...
                      </span>
                    ) : (
                      'Submit Feedback'
                    )}
                  </button>
                </form>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
} 