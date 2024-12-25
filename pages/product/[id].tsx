import UseFetch from '@/app/core/Fetch';
import { Item } from '@/app/types/item';
import { LucideMessageSquareText } from 'lucide-react';
import { useRouter } from 'next/router';
import { it } from 'node:test';
import { useState, useEffect } from 'react';

export default function ProductDetail() {
  const router = useRouter();
  const { id } = router.query;
  const { getData, error } = UseFetch();
  const [item, fetchItems] = useState<Item>();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData(`items/${id}`);
      fetchItems(data);
      error && console.error(`Error fetching product item: ${id} with error: ${error}`);
    }

    fetchData();
  }, [getData]);

  if (!item) return "Item not found";

  return (
    <div className="flex flex-col">
      <button onClick={() => router.back()} className="mb-4 text-blue-500">
        ← Back
      </button>
      <div className="bg-gray-100 min-h-screen flex flex-col">
        <div className="bg-white">
          <img src={item.image} alt={item.name} className="w-full h-64 object-cover"
          />
        </div>

        {/* Product Details */}
        <div className="p-4 bg-white rounded-t-lg shadow-lg -mt-4">
          <h2 className="text-xl font-bold text-gray-800">{item.name}</h2>
          {/* <p className="text-sm text-gray-500">{item?.category}</p> */}

          <div className="flex justify-between items-center mt-4 space-x-8">
            <div className="flex items-center space-x-2 text-green-600">
              <p className="my-4 text-gray-700">Brand: </p>
              <span>{item.brand}</span>
            </div>
            <div className="flex items-center space-x-2 text-green-600">
              <p className="my-4 text-gray-700">Model: </p>
              <span>{item.model}</span>
            </div>
            <div className="flex items-center space-x-2 text-green-600">
              <p className="my-4 text-gray-700">Condition: </p>
              <span>{item.condition}</span>
            </div>
            <div className={`flex items-center space-x-2 text-${item.stock < 0 ? 'red-600' : 'green-600'}`}>
              {item.stock < 0 ? 'Out of Stock' :
                (<>
                  <p className="my-4 text-gray-700">Price: </p>
                  <span><i className='my-1 text-gray-500'>¢ </i>{item.price}.00</span>
                </>)
              }
            </div>
          </div>

          <div className="flex items-center justify-between">
            <button className="flex items-center text-green-500 space-x-2">
              <LucideMessageSquareText />
              <span>Message</span>
            </button>
            <button className="bg-green-900 text-white px-4 py-2 rounded-lg shadow-md">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
