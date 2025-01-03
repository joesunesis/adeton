import { useAuth } from '@/app/core/AuthContext';
import { useCart } from '@/app/core/CartContext';
import UseFetch from '@/app/core/Fetch';
import { LucideMessageSquareText } from 'lucide-react';
import { useRouter } from 'next/router';

export default function ProductDetail() {
  const router = useRouter();
  const { error } = UseFetch();
  const { addToCart } = useCart();
  const { user } = useAuth();

  const { id, name, brand, condition, model, stock, image, price, cat_name, cat_id } = router.query;
  
  const handleAddToCart = () => {
    if (!user) {return router.push('/signin');}
    const item = { 
      id: id as string, 
      name: name as string, 
      price: price as unknown as number, 
      quantity: stock as unknown as number, 
      image: image as string
     };
    addToCart(item);
  };

  return (
    <div className="flex flex-col p-8">
      {error ?
        <h1>Item: {id} not available</h1>
        :
        <div className="text-center space-y-6">
          <img
            src={String(image)}
            alt={String(name)}
            className="w-full h-64 object-cover rounded-lg"
          />
          <p className="text-md text-gray-500" onClick={() => router.push(`/category/${cat_id}`)}>{cat_name}</p>
          <h2 className="text-2xl font-bold">Product {name}</h2>

          <div className="flex items-center justify-between my-4">
              <span>Brand: {brand}</span>
              <span>Model: {model}</span>
          </div>

          <div className='flex justify-between'>
              <span>Condition: {condition}</span>
            {(Number(stock) > 0) ? 
              <p className='font-semibold text-xl'>¢{Number(price).toFixed(2)}</p>
            :
            <p className="text-red-600 line-through">Out of Stock</p>
          }
          </div>

          <div className="flex items-center justify-between mt-5">
            <button className="flex items-center space-x-2">
              <LucideMessageSquareText className='text-green-500' />
              <span>Message</span>
            </button>
            <button
            onClick={handleAddToCart}
             className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md"
             >
              Add to Cart
            </button>
          </div>
        </div>
      }
    </div>
  );
};
