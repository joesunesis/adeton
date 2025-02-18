import { User } from '@/app/types/user';
import { useAuth } from '@/app/core/AuthContext';
import { useEffect, useState } from 'react';
import { UserProfile, Spinner } from '@/app/components';
import UseFetch from '@/app/core/Fetch';
import { useRouter } from 'next/router';

export default function Profile() {
  const { updateData, error, loading } = UseFetch();
  const { user } = useAuth();
  const [storedUser, setUser] = useState<User | null>(null);
  const [updatedUser, setUpdatedUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!user) router.push('/signin')
    setUser(user || storedUser);
    setUpdatedUser(user || storedUser);
  }, [user, router, storedUser]);

  const updateUserProfile = async (userProfile: Partial<User>) => {
    const response = await updateData('user', userProfile, {userId: user?.id});

    if (response) {
      setUser(response);
      setUpdatedUser(response);
    }

    if (error) {
      alert("Could not update user userProfile");
      console.error("Could not update user userProfile");
    }
  };

  return loading ? <Spinner /> : <UserProfile user={updatedUser} updateUserProfile={updateUserProfile} />
}