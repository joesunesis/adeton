import { Menu, CircleDot, User, Home, Layers3, ShoppingBag, ShoppingCart } from 'lucide-react';
import Link from 'next/link';

export default function FixedNavigation() {
  return (
    <nav className="fixed bottom-5 left-1/2 transform -translate-x-1/2 bg-white/90 shadow-lg border border-gray-300 w-full max-w-xs rounded-3xl">
      <div className="flex justify-around items-center py-2">
        <Link href="/" className="text-gray-600 hover:text-green-500 flex flex-col items-center">
          <span>🏠</span>
            <span className="text-md">Home</span>
        </Link>
        <Link href="/category" className="text-gray-600 hover:text-green-500 flex flex-col items-center">
          <span>📂</span>
            <span className="text-md">Categories</span>
        </Link>
        <Link href="/order" className="text-gray-600 hover:text-green-500 flex flex-col items-center">
            <span>🛒</span>
            <span className="text-md">Orders</span>
        </Link>
        <Link href="/profile" className="text-gray-600 hover:text-green-500 flex flex-col items-center">
            <span>👤</span>
            <span className="text-md">Account</span>
        </Link>
      </div>
    </nav>
  );
}