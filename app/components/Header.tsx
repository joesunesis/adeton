import Link from 'next/link'
import { useEffect, useState } from 'react';
import MaxWidthWrapper from './MaxWidthWrapper';
import { useAuth } from '../core/AuthContext';
import { User } from '../types/user';
import { useRouter } from 'next/router';
import { useLocalStorage } from '../core/useLocalStorage';

const Header = () => {
  const { user, logout, setRedirect } = useAuth();
  const [storedUser, setUser] = useState<User | null>(null);
  const router = useRouter();
  
  useEffect(() => {
    setUser(user ? user : storedUser);
  }, [user]);

  const handleLogout = (e: React.FormEvent) => {
    e.preventDefault();
    setUser(null);
    user?.phone && logout();
    router.push('/');
  };

  return (
    <header className="shadow-lg border-t border-gray-300 pt-2 px-4 flex justify-between items-center w-full top-0 z-50">
      <nav className="stcky z-[100] w-full bg-white/75 backdrop-blur-lg transition-all">
        <MaxWidthWrapper>
          <div className="flex items-center justify-between border-zinc-200">
            {/* Logo */}
            <Link href='/' className='flex z-40 text-2xl font-semibold'>
              Yeton
            </Link>
            <div className="h-full flex items-center space-x-4 mb-1">
              <Link href="/search">
                <button>
                  <span className="text-white text-2xl px-5">🔍</span>
                </button>
              </Link>
              {storedUser ? (
                <div>
                  <span>{user?.name || 'User'} ✨ </span>
                  <Link href="/order" className="text-red-500">
                    🛒 Cart
                  </Link>
                  <button onClick={handleLogout} className="ml-4 bg-red-500 text-white p-2 rounded-lg">
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex space-x-4">
                  <Link href="/signup">
                      <button className="border border-[#90E401] bg-[#90E401] text-black px-4 py-1 rounded hover:bg-inherit">Join Now</button>
                  </Link>
                  <Link href="/signin">
                      <button className="border border-[#90E401] text-[#90E401] px-4 py-1 rounded hover:bg-[#90E401] hover:text-black" onClick={() => setRedirect(router.pathname)}>Sign in</button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </MaxWidthWrapper>
      </nav>
    </header>
  );
}

export default Header
