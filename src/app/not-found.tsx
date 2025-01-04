import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Page Not Found</h1>
        <p className="text-gray-600 mb-8">We couldn&apos;t find the page you&apos;re looking for.</p>
        <Link 
          href="/" 
          className="text-purple-600 hover:text-purple-700 font-medium"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
} 