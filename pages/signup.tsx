import { useAuth } from '@/app/core/AuthContext';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Link from 'next/link';
import { MaxWidthWrapper } from '@/app/components';

export default function Signup() {
  const { token, register, loading, redirect } = useAuth();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (fullName == '' && email == '' && phone == '' && gender == '' && password == '')
      return alert('Incorrect Details!');

    await register(fullName, email, phone, gender, password);
    router.push(redirect);
  };

  token && router.push(redirect);
  if (loading) return <div>Loading ..... </div>

  return (
    <MaxWidthWrapper className='h-screen p-4 flex justify-center items-start sm:items-center'>
      <form onSubmit={handleSubmit} className="w-80 p-6 rounded-lg shadow-lg bg-gray-50">
        <h1 className="text-2xl font-bold mb-6 text-center">Create an account</h1>
        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
        />
        <input
          type="text"
          placeholder="Tel:"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
        />
        <div className="mb-4">
          <label className="block mb-2">Select Gender:</label>
          <div className="flex justify-around">
            <label className="flex items-center">
              <input
                type="radio"
                value="male"
                checked={gender === 'male'}
                onChange={(e) => setGender(e.target.value)}
                className="mr-2"
              />
              Male
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="female"
                checked={gender === 'female'}
                onChange={(e) => setGender(e.target.value)}
                className="mr-2"
              />
              Female
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="other"
                checked={gender === 'other'}
                onChange={(e) => setGender(e.target.value)}
                className="mr-2"
              />
              Other
            </label>
          </div>
        </div>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
        />
        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700">
          Login
        </button>
        <p className="mt-4 text-center">
          Already have an account?{' '}
          <Link href="/signin">
            <span className="text-green-500 underline">Sign up</span>
          </Link>
        </p>
        {/* <p className="text-center text-gray-500 mt-4">Or continue with</p>
        <div className="flex justify-around mt-4">
          <button className="bg-blue-600 text-white py-2 px-4 rounded-lg">Facebook</button>
          <button className="bg-red-600 text-white py-2 px-4 rounded-lg">Google</button>
          <button className="bg-black text-white py-2 px-4 rounded-lg">Apple</button>
        </div> */}
      </form>
    </MaxWidthWrapper>
  );
};
