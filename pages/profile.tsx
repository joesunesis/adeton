import { User } from '@/app/types/user';
import { useAuth } from '@/app/core/AuthContext';
import { useEffect, useState } from 'react';
import { UserDetails, Spinner } from '@/app/components';
import UseFetch from '@/app/core/Fetch';
import { useRouter } from 'next/router';

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
  }, [user]);

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

    if (error) {
      alert("Could not update user details");
      console.error("Could not update user details");
    }
  };

  return loading ? <Spinner /> : <UserDetails user={updatedUser} updateUserDetails={updateUserDetails} />
}