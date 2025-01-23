import { AddressComponent, Spinner } from '@/app/components'
import { useAuth } from '@/app/core/AuthContext'
import UseFetch from '@/app/core/Fetch';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'

const Address = () => {
  const { user } = useAuth();
  const { getData, error, loading } = UseFetch();
  const [userAdd, setUserAdd] = useState<{ region: string, city: string }>();
  const router = useRouter();
  
  useEffect(() => {
    if (!user) router.push('/signin');
    const getAddress = async () => {
      const res = await getData(`/addresses/users/${user}`);
      if (error) {
        alert("Could not fetch address");
        console.error("Could not fetch address: ", error);
      }
      if (res) setUserAdd(res);
    }
    getAddress();
  }, [user, error, router, getData]);

  const updateAddress = async (address: object) => {
    const res = await getData('/address', {
      method: 'POST',
      body: JSON.stringify({ userId: user?.userId, address }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (error) {
      alert("Could not save address");
      console.error("Could not save address");
    }
    if (res) alert('Successfully updated user address');
  };

  return loading ? <Spinner /> : <AddressComponent updateAddress={updateAddress} userAdd={userAdd} />
}

export default Address;
