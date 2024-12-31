import { useCart } from '@/app/core/CartContext';
import UseFetch from '@/app/core/Fetch';
import { Item } from '@/app/types/item';
import { LucideMessageSquareText } from 'lucide-react';
import { useRouter } from 'next/router';

export default function ProductDetail() {
  const router = useRouter();
  const { id, name, brand, condition, model, stock, image, price } = router.query;
  const { error } = UseFetch();
  const { dispatch } = useCart();

  const handleAddToCart = (item: Item) => {
    dispatch({ type: 'ADD_ITEM', payload: { ...item, quantity: 1 , id: item.itemId} });
  };

  return (
    <div className="flex flex-col">
      <button onClick={() => router.back()} className="mb-4 text-blue-500">
        ← Back
      </button>
      {error ?
        <h1>Item: {id} not available</h1>
        :
        <div className="text-center">
          <img
            src={image}
            alt="Product Image"
            className="w-full h-64 object-cover rounded-lg mb-4"
          />
          <h1 className="text-2xl font-bold">Product {name}</h1>
          <p className="text-gray-500">${price}</p>
          <p className="my-4 text-gray-700">
            Detailed description of Product {condition}. Lorem ipsum dolor sit amet,
            consectetur adipiscing elit.
          </p>

          <div className="flex justify-center space-x-4 mt-4">
            <button className="px-4 py-2 bg-gray-200 rounded-lg">Size: {model}</button>
            <button className="px-4 py-2 bg-gray-200 rounded-lg">Color: Blue</button>
          </div>

          <div className="flex items-center justify-between">
            <button className="flex items-center text-green-500 space-x-2">
              <LucideMessageSquareText />
              <span>Message</span>
            </button>
            <button
            onClick={() => handleAddToCart(item)}
             className="bg-green-900 text-white px-4 py-2 rounded-lg shadow-md"
             >
              Add to Cart
            </button>
          </div>
        </div>
      }
    </div>
  );
};
