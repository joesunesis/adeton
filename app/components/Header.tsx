import MaxWidthWrapper from './MaxWidthWrapper';
import { useAuth } from '../core/AuthContext';
import { useRouter } from 'next/router';

const Header = () => {
  const { user, setRedirect } = useAuth();
  const router = useRouter();

  function getInitials(userName: string) { return userName.split(' ').map(name => name[0].toUpperCase()).join(''); }

  return (
    <header className="shadow-xl p-4 rounded-b-sm">
      <nav className="stcky w-full backdrop-blur-lg transition-all">
        <MaxWidthWrapper>
          <div className="flex items-center justify-between">
            <div className='text-2xl font-semibold cursor-pointer' onClick={() => router.push('/')}>
              Yeton
            </div>
            <div className="h-full flex items-center mb-1 cursor-pointer space-x-4">
                <span className="text-white text-2xl px-5r" onClick={() => router.push('/search')}>🔍</span>
              <div className='flex items-center justify-center space-x-4'>
                {user ? (
                  <div className="relative inline-block text-left" onClick={() => router.push('/settings')}>
                    {user?.imageUrl ? (
                      <img
                        id="avatarButton"
                        className="w-10 h-10 rounded-full"
                        src={user.imageUrl}
                        alt="User dropdown"
                      />
                    ) : (
                      <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-300 rounded-full dark:bg-gray-600">
                        <span className="font-medium text-gray-600 dark:text-gray-300">
                          {getInitials(user?.name)}
                        </span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div onClick={() => router.push('/signin')}>
                    {/* <button className="border border-[#90E401] text-[#90E401] px-4 py-1 rounded hover:bg-[#90E401] hover:text-black" onClick={() => setRedirect(router.pathname)}>Log in</button> */}
                  </div>
                )}
                <div className="text-red-500" onClick={() => router.push('/cart')}>
                  🛒
                </div>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </nav>
    </header>
  );
}

export default Header
