const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 mt-20">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-xl font-bold mb-4">VisionBoard AI</h3>
          <p className="text-gray-400">
            Transform your dreams into visual inspiration with the power of AI.
          </p>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-gray-400">
            <li><a href="/" className="hover:text-white transition-colors">Home</a></li>
            <li><a href="/about" className="hover:text-white transition-colors">About</a></li>
            <li><a href="/gallery" className="hover:text-white transition-colors">Gallery</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-4">Contact</h3>
          <ul className="space-y-2 text-gray-400">
            <li>Email: hello@visionboardai.com</li>
            <li>Follow us on Twitter @VisionBoardAI</li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 pt-8 mt-8 border-t border-gray-800 text-center text-gray-400">
        <p>© {new Date().getFullYear()} VisionBoard AI. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer; 