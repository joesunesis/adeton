import { useAuth } from '@/app/core/AuthContext';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Spinner } from '@/app/components';

export default function Signup() {
  const { register, loading, error } = useAuth();
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (fullName == '' && phone == '' && gender == '' && password == '')
      return alert('Incorrect Details!');
    await register(fullName, phone, gender, password);
    if (error) return alert('User registration failed!');
    router.push('/signin');
  };

  return loading ? <Spinner /> :
    (
      <div className='p-4 flex justify-center items-start sm:items-center'>
        <form onSubmit={handleSubmit} className="w-80 p-6 rounded-lg shadow-lg bg-gray-50">
          <h1 className="text-lg font-bold mb-6 text-center">Create an account</h1>
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
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
            <span className="text-green-500 underline cursor-pointer" onClick={() => router.push('/signin')}>Sign up</span>
          </p>
        </form>
      </div>
    );
};
