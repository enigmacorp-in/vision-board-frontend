'use client';

import Link from 'next/link';
import { Montserrat, Playfair_Display } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const montserrat = Montserrat({ subsets: ['latin'] });
const playfair = Playfair_Display({ subsets: ['latin'] });

export default function Home() {
  return (
    <div className={`min-h-screen flex flex-col ${montserrat.className} bg-gradient-to-b from-gray-50 to-white`}>
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className={`${playfair.className} text-5xl md:text-6xl font-bold mb-6 text-gray-900`}>
                Transform Your Dreams into Visual Reality
              </h1>
              <p className="text-xl text-gray-600 mb-12">
                Create stunning vision boards and turn your ideas into beautiful images with 
                <span className="text-purple-600"> the power of AI.</span>
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/create-vision"
                  className="bg-purple-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-purple-500 transition-all duration-200 hover:shadow-lg"
                >
                  Create Your Vision Board
                </Link>
                <Link
                  href="/create-image"
                  className="bg-white text-purple-600 border-2 border-purple-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-purple-50 transition-all duration-200"
                >
                  Generate Images
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className={`${playfair.className} text-4xl font-bold text-center mb-16 text-gray-900`}>
              Our Features
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Vision Board Creation</h3>
                <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                  Transform your goals and aspirations into a beautiful, inspiring vision board that keeps you motivated.
                </p>
                <Link
                  href="/create-vision"
                  className="text-purple-600 font-semibold hover:text-purple-700 transition-colors inline-flex items-center text-lg group"
                >
                  Create Now
                  <svg className="w-5 h-5 ml-2 transform transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>

              <div className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Text to Image Generation</h3>
                <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                  Convert your ideas into stunning visuals using our advanced AI image generation technology.
                </p>
                <Link
                  href="/create-image"
                  className="text-purple-600 font-semibold hover:text-purple-700 transition-colors inline-flex items-center text-lg group"
                >
                  Try It Out
                  <svg className="w-5 h-5 ml-2 transform transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
