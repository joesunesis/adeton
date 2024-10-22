'use client'

import Link from 'next/link'
import { useAuth } from '../context/AuthContext';
import UtiltyComponent from '../context';



const Header = () => {
  // const { logout } = useAuth();
  // const [token, setToken] = useLocalStorage('tokenAPI', '');

  // const [useDetails, setUserDetails] = useLocalStorage('userDetails', '')

  const handleLogout = (e: React.FormEvent) => {
    e.preventDefault();
    // console.log(useDetails)
  }

  return (
    <>
    <UtiltyComponent />
    <header className="bg-white shadow-lg border-t border-gray-300 p-4 flex justify-between items-center fixed w-full top-0 z-50">
      {/* Logo */}
      <div className="text-xl font-bold">
        Yeton
      </div>

      {/* {token ? */}
        <button onClick={handleLogout}></button>
        {/* : */}
        <div className="flex space-x-4">
          <Link href="/signup" className="text-blue-500 hover:text-blue-600">
            <button className="bg-[#90E401] text-black">
              Join Now
            </button>
          </Link>
          <Link href="/signin" className="text-blue-500 hover:text-blue-600">
            <button className="border-[#90E401]">Login</button>
          </Link>
        </div>
      {/* } */}
    </header>
    </>
  );
}

export default Header
