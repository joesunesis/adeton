import Link from 'next/link';
import { CategoriesIcon, HomeIcon, ShoppingBagIcon, UserProfileIcon } from './Icons';
import { useRouter } from 'next/router';

export default function FixedNavigation() {
  const router = useRouter();
  return (
    <nav className="fixed bottom-5 left-1/2 transform -translate-x-1/2 bg-white/90 shadow-lg border border-gray-300 w-full max-w-xs tm:max-w-sm lg:max-w-md rounded-2xl">
      <div className="flex justify-around items-center py-[2px] cursor-pointer">
        <div onClick={() => router.push('/')} className="text-gray-600 hover:text-green-500 flex flex-col items-center">
          <HomeIcon />
          <span className="text-md">Home</span>
        </div>
        <div onClick={() => router.push('category')} className="text-gray-600 hover:text-green-500 flex flex-col items-center">
          <CategoriesIcon />
          <span className="text-md">Categories</span>
        </div>
        <div onClick={() => router.push('order')} className="text-gray-600 hover:text-green-500 flex flex-col items-center">
          <ShoppingBagIcon />
          <span className="text-md">Orders</span>
        </div>
        <div onClick={() => router.push('settings')} className="text-gray-600 hover:text-green-500 flex flex-col items-center">
          <UserProfileIcon />
          <span className="text-md">Account</span>
        </div>
      </div>
    </nav>
  );
}