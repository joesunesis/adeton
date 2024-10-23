import Link from 'next/link'
import { useAuth } from '../context/AuthContext';
import { useLocalStorage } from '../context/useLocalStorage';
import { User } from '../types/user';
import MaxWidthWrapper from './MaxWidthWrapper';

const Header = () => {
  const { logout } = useAuth();

  // const [token, , removeToken] = useLocalStorage<string | null>('tokenAPI');
  const [user, , removeUser] = useLocalStorage<User | null>('userDetails');

  const handleLogout = (e: React.FormEvent) => {
    e.preventDefault();
    if (user?.phone) {
      logout(user.phone);
    }
    removeUser();
  };
  console.log(user);

  return (
    <header className="shadow-lg border-t border-gray-300 p-4 flex justify-between items-center w-full top-0 z-50">
      <nav className="stcky z-[100] w-full bg-white/75 backdrop-blur-lg transition-all">
        <MaxWidthWrapper>
          <div className="flex items-center justify-between border-zinc-200">
            {/* Logo */}
            <Link href='/' className='flex z-40 text-xl font-semibold'>
              Yeton
            </Link>
            <div className="h-full flex items-center space-x-4">
              {user ? (
                <div>
                  <span>{user?.name || 'User'} ✨ </span>
                  <button onClick={handleLogout} className="ml-4 bg-red-500 text-white p-2 rounded-lg">
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex space-x-4">
                  <Link href="/signup">
                    <button className="bg-[#90E401] text-black px-4 py-2 rounded">Join Now</button>
                  </Link>
                  <Link href="/signin">
                    <button className="border border-[#90E401] text-[#90E401] px-4 py-2 rounded">Sign in</button>
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
