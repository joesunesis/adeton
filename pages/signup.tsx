import { useAuth } from '@/app/core/AuthContext';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Spinner } from '@/app/components';
import { validatePhone, validatePassword, formatPhone, ValidationError } from '../lib/validation';
import Link from 'next/link';

export default function Signup() {
  const { register, loading, error } = useAuth();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');
  const [password, setPassword] = useState('');
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>([]);
  const router = useRouter();

  const validateForm = () => {
    const errors: ValidationError[] = [];

    // Validate name
    if (!name.trim()) errors.push({ field: 'name', message: 'Name is required' });
    else if (name.length < 2) errors.push({ field: 'name', message: 'Name must be at least 2 characters long' });

    // Validate phone
    const phoneError = validatePhone(phone);
    if (phoneError) errors.push(phoneError);

    // Validate gender
    if (!gender) errors.push({ field: 'gender', message: 'Please select a gender' });

    // Validate password
    const passwordError = validatePassword(password);
    if (passwordError) errors.push(passwordError);

    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Clear previous validation errors
    setValidationErrors([]);

    // Validate form
    const errors = validateForm();
    if (errors.length > 0) {
      setValidationErrors(errors);
      return;
    }

    try {
      const formattedPhone = formatPhone(phone);
      await register(formattedPhone, password, {
        name,
        gender,
      });
      router.push('/signin');
    } catch (err) {
      console.error('Registration failed:', err);
    }
  };

  const getFieldError = (field: string) => {
    return validationErrors.find(error => error.field === field)?.message;
  };

  if (loading) return <Spinner />;

  return (
    <div className='p-4 flex justify-center items-start sm:items-center'>
      <div className="w-full max-w-md">
        <form onSubmit={handleSubmit} className="p-6 rounded-lg shadow-lg bg-gray-50">
          <h1 className="text-2xl font-bold mb-6 text-center">Create an account</h1>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`w-full p-2 border ${getFieldError('name') ? 'border-red-300' : 'border-gray-300'} rounded-lg text-black focus:ring-2 focus:ring-green-500 focus:border-transparent`}
              />
              {getFieldError('name') && (
                <p className="mt-1 text-sm text-red-600">{getFieldError('name')}</p>
              )}
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                id="phone"
                type="tel"
                placeholder="+1234567890"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={`w-full p-2 border ${getFieldError('phone') ? 'border-red-300' : 'border-gray-300'} rounded-lg text-black focus:ring-2 focus:ring-green-500 focus:border-transparent`}
              />
              {getFieldError('phone') && (
                <p className="mt-1 text-sm text-red-600">{getFieldError('phone')}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
              <div className="flex justify-around space-x-4">
                {['male', 'female', 'other'].map((option) => (
                  <label key={option} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      value={option}
                      checked={gender === option}
                      onChange={(e) => setGender(e.target.value)}
                      className="form-radio text-green-600 focus:ring-green-500"
                    />
                    <span className="capitalize">{option}</span>
                  </label>
                ))}
              </div>
              {getFieldError('gender') && (
                <p className="mt-1 text-sm text-red-600">{getFieldError('gender')}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Create a strong password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full p-2 border ${getFieldError('password') ? 'border-red-300' : 'border-gray-300'} rounded-lg text-black focus:ring-2 focus:ring-green-500 focus:border-transparent`}
              />
              {getFieldError('password') && (
                <p className="mt-1 text-sm text-red-600">{getFieldError('password')}</p>
              )}
            </div>
          </div>

          {error && (
            <div className="mt-4 text-red-500 text-sm text-center">
              {error.message}
            </div>
          )}

          <button 
            type="submit" 
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? 'Creating account...' : 'Create Account'}
          </button>

          <p className="mt-4 text-center text-sm">
            Already have an account?{' '}
            <Link href="/signin" className="text-green-600 hover:text-green-700">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};
