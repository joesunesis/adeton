import { useState, useEffect } from 'react';
import { useAuth } from '../app/context/AuthContext';
import { useRouter } from 'next/router';

interface Order {
  id: number;
  productName: string;
  totalAmount: string;
  date: string;
}

export default function Orders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/signin');
    } else {
      // Simulate an API call for orders
      setOrders([
        { id: 1, productName: 'Product 1', totalAmount: '$100', date: '2023-10-01' },
        { id: 2, productName: 'Product 2', totalAmount: '$50', date: '2023-09-25' },
      ]);
    }
  }, [user, router]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Your Orders</h2>
      <ul>
        {orders.map((order) => (
          <li key={order.id} className="mb-4">
            <div className="p-4 bg-white shadow rounded-lg">
              <h3 className="text-lg">{order.productName}</h3>
              <p>Total: {order.totalAmount}</p>
              <p>Date: {order.date}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
