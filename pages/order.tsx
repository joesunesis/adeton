import { useAuth } from '@/app/core/AuthContext';
import { User } from '@/app/types/user';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Order() {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Product 1', price: '$10', quantity: 1 },
    { id: 2, name: 'Product 2', price: '$20', quantity: 2 },
  ]);
  const [storedUser, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    !user && router.push('/signin')
    setUser(user || storedUser);
  }, [user]);

  const totalAmount = cartItems.reduce((total, item) => total + parseFloat(item.price.slice(1)) * item.quantity, 0);

  const handleCheckout = () => {
    alert('Order placed successfully!');
    setCartItems([]); // Clear the cart
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-4">Your Cart</h2>
      <ul>
        {cartItems.map((item) => (
          <li key={item.id} className="mb-4">
            <div className="p-4 bg-white text-black shadow rounded-lg flex justify-between items-center">
              <div>
                <h3 className="text-lg">{item.name}</h3>
                <p>Price: {item.price}</p>
                <p>Quantity: {item.quantity}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="text-right">
        <p className="text-lg font-semibold mb-4">Total: ${totalAmount.toFixed(2)}</p>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
          onClick={handleCheckout}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};
