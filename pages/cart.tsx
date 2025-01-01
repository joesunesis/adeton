import { useAuth } from '@/app/core/AuthContext';
import { useCart } from '@/app/core/CartContext'; 
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Cart() {
  const { cart, removeFromCart, clearCart, order } = useCart();
  const { user } = useAuth();
  const router = useRouter();

  const [quantities, setQuantities] = useState(
    cart.reduce((acc, item) => {
      acc[item.id] = 1;
      return acc;
    }, {} as { [key: string]: number })
  );

  useEffect(() => {
    !user && router.push('/signin');
  }, [user]);

  const handleQuantityChange = (id: string, newQuantity: number) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(1, newQuantity),
    }));
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * quantities[item.id], 0).toFixed(2);
  };

  const checkout = () => {
    cart.map(item => order(item));
    clearCart();
  }

  return (
      <div className="p-4">
        <h1 className="text-lg font-bold">My Cart</h1>
        {cart.length === 0 ? (
          <div className="text-center text-gray-600">
            <p>Your cart is empty.</p>
            <button
              onClick={() => router.push('/')}
              className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            {cart.map((item) => {
              const price = Number(item.price);
              return (
                <div
                  key={item.id}
                  className="flex items-center justify-between bg-white rounded-lg shadow-md p-4 mb-4"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <div className="flex-1 mx-4">
                    <h2 className="text-lg font-bold">{item.name}</h2>
                    <p className="text-gray-500">
                      ${!isNaN(price) ? price.toFixed(2) : "0.00"}
                    </p>
                    <div className="mt-2 flex items-center">
                      <button
                        onClick={() =>
                          handleQuantityChange(item.id, quantities[item.id] - 1)
                        }
                        className="px-2 py-1 bg-gray-200 rounded-md"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        value={quantities[item.id]}
                        onChange={(e) =>
                          handleQuantityChange(item.id, parseInt(e.target.value) || 1)
                        }
                        className="w-12 text-center mx-2 border border-gray-300 rounded-md"
                      />
                      <button
                        onClick={() =>
                          handleQuantityChange(item.id, quantities[item.id] + 1)
                        }
                        className="px-2 py-1 bg-gray-200 rounded-md"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              );
            })}

            <div className="bg-white rounded-lg shadow-md p-4 mt-4">
              <div className="flex justify-between items-center">
                <p className="text-lg font-bold">Total:</p>
                <p className="text-xl font-bold text-green-500">${calculateTotal()}</p>
              </div>
              <button
                onClick={checkout}
                className="w-full mt-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-md"
              >
                Proceed to Checkout
              </button>
              <button
                onClick={clearCart}
                className="w-full mt-2 text-gray-500 hover:text-gray-700"
              >
                Clear Cart
              </button>
            </div>
          </>
        )}
      </div>
  );
}