import Link from 'next/link'

const Header = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-lg border-t border-gray-300">
      <div className="flex justify-around py-2">
        <Link href="/products" className="text-blue-500 hover:text-blue-600">
          Home
        </Link>
        {/* <Link h  */}
        <Link href="/category" className="text-blue-500 hover:text-blue-600">
          Categories
        </Link>
        <Link href="/order" className="text-blue-500 hover:text-blue-600">
          Cart
        </Link>
        <Link href="/profile" className="text-blue-500 hover:text-blue-600">
          My Account
        </Link>
      </div>
    </nav>
  );
}

export default Header
