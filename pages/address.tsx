import { Address, Spinner } from '@/app/components'
import { useAuth } from '@/app/core/AuthContext'
import UseFetch from '@/app/core/Fetch';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'

const address = () => {
  const { user, setRedirect } = useAuth();
  const { getData, error, loading } = UseFetch();
  const [userAdd, setUserAdd] = useState<{ region: string, city: string }>();
  const router = useRouter();
  
  useEffect(() => {
    !user && router.push('/signin');
    const getAddress = async () => {
      const res = await getData(`/addresses/users/${user}`);
      if (error) {
        alert("Could not fetch address");
        console.error("Could not fetch address: ", error);
      }
      res && setUserAdd(res);
    }
    getAddress();
  }, [user]);

  const updateAddress = async (address: {}) => {
    const res = await getData('/address', {
      method: 'POST',
      body: JSON.stringify({ userId: user?.userId, address }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (error) {
      alert("Could not save address");
      console.error("Could not save address");
    }
    res && alert('Successfully updated user address');
  };

  return loading ? <Spinner /> : <Address updateAddress={updateAddress} userAdd={userAdd} />
}

export default address
