import { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../app/core/AuthContext';
import { MaxWidthWrapper, Spinner } from '@/app/components';

export default function Login() {
  const { token, authenticate, loading, redirect, error } = useAuth();
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (phone == '' && password == '')
      return alert('phone and password is incorrect!');
    await authenticate(phone, password);
    error && alert('Could not sign in!')
  };
  
  token && router.push(redirect);
  
  return loading ? <Spinner /> :
    (
      <MaxWidthWrapper className='p-4 flex justify-center items-start sm:items-center'>
        <form onSubmit={handleSubmit} className="w-80 p-6 rounded-lg shadow-lg bg-gray-50">
          <h1 className="text-lg font-bold mb-6 text-center">Welcome Back</h1>
          <input
            type="text"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full p-2 mb-4 border border-gray-300 rounded-lg text-black"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 mb-4 border border-gray-300 rounded-lg text-black"
          />
          <button type="submit" className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700">
            Login
          </button>
          <p className="mt-4 flex flex-col">
            <span className="text-green-500 underline cursor-pointer" onClick={() => router.push('/reset-password')}>Forgot Password?</span>
              Don't have an account?{' '}
              <span className="text-green-500 underline cursor-pointer" onClick={() => router.push('/signup')}>Register!</span>
          </p>
        </form>
      </MaxWidthWrapper>
    );
};