import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useAuth } from '../app/core/AuthContext';
import { MaxWidthWrapper } from '@/app/components';

export default function Login() {
  const { token, authenticate, loading, redirect } = useAuth();
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (phone == '' && password == '')
      return alert('phone and password is incorrect!');
    
    await authenticate(phone, password);
    router.push(redirect);
  };

  token && router.push(redirect);
  if (loading) return <div>Loading ..... </div>

  return (
    <MaxWidthWrapper className='p-4 flex justify-center items-start sm:items-center'>
      <form onSubmit={handleSubmit} className="w-80 p-6 rounded-lg shadow-lg bg-gray-50">
        <h1 className="text-2xl font-bold mb-6 text-center">Welcome Back</h1>
        <input
          type="text"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
        />
        <div className="flex justify-between items-center mb-4">
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            Remember Me
          </label>
          <Link href="reset-password">
            <span className="text-green-500 underline">Forgot Password?</span>
          </Link>
        </div>
        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700">
          Login
        </button>
        <p className="mt-4 text-center">
          Don't have an account?{' '}
          <Link href="/signup">
            <span className="text-green-500 underline">Register Now!</span>
          </Link>
        </p>
      </form>
    </MaxWidthWrapper>
  );
};