import { useAuth } from '@/app/core/AuthContext'
import { useRouter } from 'next/router';
import { useEffect } from 'react'

const Logout = () => {
  const { user, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user?.phone) logout();
    router.push('/');
  }, [user, router, logout]);
}

export default Logout
