import { useAuth } from '../core/AuthContext';
import { useRouter } from 'next/router';
import { useOrder } from '../core/OrderContext';
import Image from 'next/image';

const Header = () => {
  const { user } = useAuth();
  const { cart } = useOrder();
  const router = useRouter();

  const getInitials = (userName: string) => { return userName.split(' ').map(name => name[0].toUpperCase()).join(''); }

  return (
    <header className="shadow-xl px-4 p-2">
      <nav className="stcky w-full backdrop-blur-lg transition-all">
        <>
          <div className="flex items-center justify-between">
            <div className='text-2xl font-semibold cursor-pointer' onClick={() => router.push('/')}>
              Yeton
            </div>
            <div className="flex items-center mb-1 cursor-pointer space-x-4">
              <span className="text-2xls" onClick={() => router.push('/search')}>🔍</span>
              <div className='flex items-center space-x-4'>
                {user && (
                  <div className="" onClick={() => router.push('/settings')}>
                    {user?.imageUrl ? (
                      <Image
                        id="avatarButton"
                        className="w-10 h-10 rounded-full"
                        src={user.imageUrl}
                        alt={getInitials(user?.name)}
                      />
                    ) : (
                      <div className="p-1 overflow-hidden bg-gray-300 rounded-full dark:bg-gray-600">
                        <span className={`font-medium text-gray-600 px-${getInitials(user.name).length === 2 ? '1' : '2'}`}>
                          {getInitials(user?.name)}
                        </span>
                      </div>
                    )}
                  </div>
                )}
                <span onClick={() => router.push('/cart')}>
                  <i>🛒</i>
                  {(user && cart.length > 0) && (
                    <span className="relative -top-2 -right-1 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                      {cart.length}
                    </span>
                  )}
                </span>
              </div>
            </div>
          </div>
        </>
      </nav>
    </header>
  );
}

export default Header
