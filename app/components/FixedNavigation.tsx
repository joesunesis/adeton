import { Menu, CircleDot, User, Home, Layers3 } from 'lucide-react';
import Link from 'next/link';

export default function FixedNavigation() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/75 backdrop-blur-lg shadow-lg border-t border-gray-300 w-full z-50 rounded-md">
      <div className="flex justify-around items-center py-4 mx-auto">
        <Link href="/">
          <button className="flex flex-col items-center hover:text-text-blue-700">
            <Home className="w-6 h-6 mb-1" />
            <span className="text-sm">Home</span>
          </button>
        </Link>
        <Link href="/category">
          <button className="flex flex-col items-center hover:text-text-blue-700">
            <Layers3 className="w-6 h-6 mb-1" />
            <span className="text-sm">Categories</span>
          </button>
        </Link>
        <Link href="/order">
          <button className="flex flex-col items-center hover:text-text-blue-700">
            <CircleDot className="w-6 h-6 mb-1" />
            <span className="text-sm">Orders</span>
          </button>
        </Link>
        <Link href="/profile">
          <button className="flex flex-col items-center hover:text-text-blue-700">
            <User className="w-6 h-6 mb-1" />
            <span className="text-sm">Account</span>
          </button>
        </Link>
      </div>
    </nav>
  );
};
