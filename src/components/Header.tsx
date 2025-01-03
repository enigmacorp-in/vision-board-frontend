import Link from 'next/link';

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-purple-700 to-indigo-700 text-white py-4 px-6 shadow-lg">
      <nav className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold font-serif text-white">
          VisionBoard AI
        </Link>
        <div className="space-x-6">
          <Link href="/" className="text-white hover:text-purple-100 transition-colors font-medium">
            Home
          </Link>
          <Link href="/create" className="text-white hover:text-purple-100 transition-colors font-medium">
            Create
          </Link>
          <Link href="/gallery" className="text-white hover:text-purple-100 transition-colors font-medium">
            Gallery
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