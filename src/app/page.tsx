'use client';

import { useState, useRef } from 'react';
import axios from 'axios';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Montserrat, Playfair_Display } from 'next/font/google';

const montserrat = Montserrat({ subsets: ['latin'] });
const playfair = Playfair_Display({ subsets: ['latin'] });

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
  const [goals, setGoals] = useState<string[]>(['']);
  const [size, setSize] = useState<string>('normal');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedBoard, setGeneratedBoard] = useState<VisionBoard | null>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const handleGoalChange = (index: number, value: string) => {
    const newGoals = [...goals];
    newGoals[index] = value;
    setGoals(newGoals);
  };

  const addGoal = () => {
    setGoals([...goals, '']);
  };

  const removeGoal = (index: number) => {
    const newGoals = goals.filter((_, i) => i !== index);
    setGoals(newGoals);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const filteredGoals = goals.filter(goal => goal.trim() !== '');
      if (filteredGoals.length === 0) {
        throw new Error('Please add at least one goal');
      }

      const response = await axios.post(`${process.env.BACKEND_URL}/api/vision-board`, {
        goals: filteredGoals,
        size
      });

      setGeneratedBoard(response.data);
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const downloadImage = async () => {
    if (!generatedBoard) return;
    
    const link = document.createElement('a');
    link.href = generatedBoard.imageUrl;
    link.download = `vision-board-${new Date().getTime()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className={`min-h-screen flex flex-col ${montserrat.className}`}>
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-purple-50 to-white py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className={`${playfair.className} text-5xl md:text-6xl font-bold text-gray-800 mb-6`}>
            Transform Your Dreams into Reality
          </h1>
          <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto font-medium">
            Create stunning vision boards powered by AI that inspire and motivate you to achieve your goals.
          </p>
          <a href="/create" className="bg-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-purple-700 transition-colors shadow-lg">
            Create Your Vision Board
          </a>
        </div>
      </section>

      {/* Why Vision Boards Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className={`${playfair.className} text-4xl font-bold text-center mb-16 text-gray-800`}>
            Why Vision Boards Matter
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-800">Visualization Power</h3>
              <p className="text-gray-700 font-medium">
                Seeing your goals daily helps program your brain to recognize resources that will help you achieve them.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-800">Motivation Boost</h3>
              <p className="text-gray-700 font-medium">
                Visual reminders of your goals keep you motivated and focused on what matters most.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-800">Clarity & Focus</h3>
              <p className="text-gray-700 font-medium">
                Vision boards help clarify your goals and keep you focused on your priorities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className={`${playfair.className} text-4xl font-bold text-center mb-16 text-gray-800`}>
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-2xl font-bold text-purple-600">1</span>
              </div>
              <h3 className="text-lg font-bold mb-2 text-gray-800">Define Your Goals</h3>
              <p className="text-gray-700 font-medium">Write down your aspirations and dreams</p>
            </div>
            <div className="text-center">
              <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-2xl font-bold text-purple-600">2</span>
              </div>
              <h3 className="text-lg font-bold mb-2 text-gray-800">Choose Your Style</h3>
              <p className="text-gray-700 font-medium">Select a layout that resonates with you</p>
            </div>
            <div className="text-center">
              <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-2xl font-bold text-purple-600">3</span>
              </div>
              <h3 className="text-lg font-bold mb-2 text-gray-800">AI Generation</h3>
              <p className="text-gray-700 font-medium">Our AI creates your personalized board</p>
            </div>
            <div className="text-center">
              <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-2xl font-bold text-purple-600">4</span>
              </div>
              <h3 className="text-lg font-bold mb-2 text-gray-800">Download & Share</h3>
              <p className="text-gray-700 font-medium">Get your vision board in high quality</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
