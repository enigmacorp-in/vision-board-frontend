const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 mt-20">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-xl font-bold mb-4">Enigma AI</h3>
          <p className="text-gray-400">
            Unleash the power of AI to transform your ideas into stunning visuals.
          </p>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-4">Our Services</h3>
          <ul className="space-y-2 text-gray-400">
            <li><a href="/create-vision" className="hover:text-white transition-colors">Vision Board</a></li>
            <li><a href="/create-image" className="hover:text-white transition-colors">Text to Image</a></li>
            <li><a href="/about" className="hover:text-white transition-colors">About</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-4">Contact</h3>
          <ul className="space-y-2 text-gray-400">
            <li>Email: hello@enigma-ai.com</li>
            <li>Follow us on Twitter @EnigmaAI</li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 pt-8 mt-8 border-t border-gray-800 text-center text-gray-400">
        <p>© {new Date().getFullYear()} Enigma AI. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer; 