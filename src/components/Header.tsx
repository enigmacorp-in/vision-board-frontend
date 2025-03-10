import Link from 'next/link';

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-purple-700 to-indigo-700 text-white py-4 px-6 shadow-lg">
      <nav className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold font-serif text-white">
          Enigma AI
        </Link>
        <div className="space-x-6">
          <Link href="/" className="text-white hover:text-purple-100 transition-colors font-medium">
            Home
          </Link>
          <Link href="/create-vision" className="text-white hover:text-purple-100 transition-colors font-medium">
            Vision Board
          </Link>
          <Link href="/create-image" className="text-white hover:text-purple-100 transition-colors font-medium">
            Text to Image
          </Link>
          <Link href="/about" className="text-white hover:text-purple-100 transition-colors font-medium">
            About
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header; 