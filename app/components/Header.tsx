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
    <header className="shadow-xl p-4">
      <nav className="stcky w-full backdrop-blur-lg transition-all">
        <MaxWidthWrapper>
          <div className="flex items-center justify-between">
            <Link href='/' className='text-2xl font-semibold'>
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
