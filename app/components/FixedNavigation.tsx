import Link from 'next/link';
import { CategoriesIcon, HomeIcon, ShoppingBagIcon, UserProfileIcon } from './Icons';
import { useRouter } from 'next/router';
import React from 'react';
import { useAuth } from '../core/AuthContext';

export default function FixedNavigation() {
  const { setRedirect } = useAuth();
  const router = useRouter();

  const handleClick = React.useCallback((path: string) => {
    setRedirect(path);
    return router.push(path);
  }, [router]);

  return (
    <nav className="fixed bottom-5 left-1/2 transform -translate-x-1/2 bg-white/90 shadow-lg border border-gray-300 rounded-2xl w-full max-w-sm md:max-w-lg lg:max-w-screen-sm">
      <div className="flex justify-around items-center py-[2px] cursor-pointer">
        <div onClick={() => handleClick('/')} className="text-gray-600 hover:text-green-500 flex flex-col items-center">
          <HomeIcon />
          <span className="text-md">Home</span>
        </div>
        <div onClick={() => handleClick('/category')} className="text-gray-600 hover:text-green-500 flex flex-col items-center">
          <CategoriesIcon />
          <span className="text-md">Categories</span>
        </div>
        <div onClick={() => handleClick('/order')} className="text-gray-600 hover:text-green-500 flex flex-col items-center">
          <ShoppingBagIcon />
          <span className="text-md">Orders</span>
        </div>
        <div onClick={() => handleClick('/settings')} className="text-gray-600 hover:text-green-500 flex flex-col items-center">
          <UserProfileIcon />
          <span className="text-md">Account</span>
        </div>
      </div>
    </nav>
  );
}