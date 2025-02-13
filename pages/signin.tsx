import { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../app/core/AuthContext';
import { Spinner } from '@/app/components';
import { validatePhone, validatePassword, formatPhone, ValidationError } from '../lib/validation';
import Link from 'next/link';

export default function Login() {
  const { authenticate, loading, redirect, error } = useAuth();
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>([]);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Clear previous validation errors
    setValidationErrors([]);

    // Validate inputs
    const phoneError = validatePhone(phone);
    const passwordError = validatePassword(password);
    const errors: ValidationError[] = [];

    if (phoneError) errors.push(phoneError);
    if (passwordError) errors.push(passwordError);

    if (errors.length > 0) {
      setValidationErrors(errors);
      return;
    }

    try {
      const formattedPhone = formatPhone(phone);
      await authenticate(formattedPhone, password);
      router.push(redirect);
    } catch (err) {
      console.error('Login failed:', err);
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
          <h1 className="text-2xl font-bold mb-6 text-center">Welcome Back</h1>
          
          <div className="space-y-4">
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
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
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
            {loading ? 'Signing in...' : 'Login'}
          </button>

          <div className="mt-4 space-y-2">
            <Link href="/reset-password" className="block text-green-600 hover:text-green-700 text-sm text-center">
              Forgot Password?
            </Link>
            <p className="text-sm text-center">
              No account yet?{' '}
              <Link href="/signup" className="text-green-600 hover:text-green-700">
                Register Here!
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};