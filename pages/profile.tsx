// src/pages/profile.tsx
import { User } from '@/app/types/user';
import { useAuth } from '@/app/core/AuthContext';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { UserDetails } from '@/app/components';
import UseFetch from '@/app/core/Fetch';

export default function Profile() {
  const { getData, error, loading } = UseFetch();
  const { user, setRedirect } = useAuth();
  const [storedUser, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    setUser(user || storedUser);
  }, [user, storedUser]);

  useEffect(() => {
    if (!user) {
      setRedirect(router.pathname);
      router.push('/signin');
    }
  }, [user, storedUser, setRedirect, router]);

  const updateUserDetails = async (userDetails: Partial<User>) => {
    const response = await getData('/user/update', {
      method: 'POST',
      body: JSON.stringify(userDetails),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response) {
      setUser(response);
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-[#1A173B] text-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Profile</h2>

      {/* User Details Section */}
      <UserDetails user={storedUser} updateUserDetails={updateUserDetails} />
    </div>
  );
}