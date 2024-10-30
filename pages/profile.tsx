import { User } from '@/app/types/user';
import { useAuth } from '../app/context/AuthContext';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Profile() {
  const { user, setRedirect } = useAuth();
  const [storedUser, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    setUser(user || storedUser);
  }, [user, storedUser]);

  useEffect(() => {
    if (!user && !storedUser) {
      setRedirect(router.pathname);
      router.push('/signin');
    }
  }, [user, storedUser, setRedirect, router]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Profile</h2>
      <div className="bg-white p-4 shadow rounded-lg">
        <p>Username: {storedUser?.name}</p>
      </div>
    </div>
  );
}