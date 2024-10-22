import { useAuth } from '../app/context/AuthContext';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Profile() {
  const { data, logout } = useAuth();
  let user = localStorage.getItem('userDetails')
  user = user != null && JSON.parse(user);

  const router = useRouter();
console.log(user);

  useEffect(() => {
    if (!user) {
      router.push('/signin'); // Redirect to login if not authenticated
    }
  }, [user, router]);

  if (!user) {
    return <div>Loading...</div>; // Show loading while redirecting
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Profile</h2>
      <div className="bg-white p-4 shadow rounded-lg">
        <p>Username: { user }</p>
        <button
          className="mt-4 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
};