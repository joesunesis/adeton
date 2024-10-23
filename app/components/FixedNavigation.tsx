import Link from 'next/link';

export default function FixedNavigation() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/75 backdrop-blur-lg shadow-lg border-t border-gray-300 w-full z-50 rounded-md">
      <div className="flex justify-around py-2">
        <Link href="/" className="text-blue-500 hover:text-blue-700">
          Home
        </Link>
        <Link href="/category" className="text-blue-500 hover:text-blue-700">
          Categories
        </Link>
        <Link href="/order" className="text-blue-500 hover:text-blue-700">
          Cart
        </Link>
        <Link href="/profile" className="text-blue-500 hover:text-blue-700">
          My Account
        </Link>
      </div>
    </nav>
  );
};
