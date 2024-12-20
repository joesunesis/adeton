import { User } from '@/app/types/user';
import { useAuth } from '@/app/core/AuthContext';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Address, UserDetails, Spinner } from '@/app/components';
import UseFetch from '@/app/core/Fetch';

export default function Profile() {
  const { getData, error, loading } = UseFetch();
  const { user, setRedirect } = useAuth();
  const [storedUser, setUser] = useState<User | null>(null);
  const [updatedUser, setUpdatedUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    setUser(user || storedUser);
    setUpdatedUser(user || storedUser);
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
      setUpdatedUser(response);
    }
  };

  const updateAddress = async (address: {}) => {
    const response = await getData('/address', {
      method: 'POST',
      body: JSON.stringify({ userId: user?.userId, address }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (error) {
      alert("Could not save address");
      console.error("Could not save address");
    }
  };

  return loading ? (
    <Spinner />
  ) : (
    <div className="p-6 max-w-lg mx-auto bg-[#1A173B] text-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Profile</h2>
      <UserDetails user={updatedUser} updateUserDetails={updateUserDetails} />
      <Address user={user?.userId} updateAddress={updateAddress} />
    </div>
  );
}