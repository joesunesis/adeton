import { useAuth } from '@/app/core/AuthContext'
import { useRouter } from 'next/router';
import React, { useEffect } from 'react'

const logout = () => {
  const { user, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    user?.phone && logout();
    router.push('/');
  }, [user]);
}

export default logout
