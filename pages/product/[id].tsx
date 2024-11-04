// pages/product/[id].tsx
import UseFetch from '@/app/core/Fetch';
import { Item } from '@/app/types/item';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

export default function ProductDetail() {
  const router = useRouter();
  const { id } = router.query;
  const { getData, error } = UseFetch();
  const [item, fetchItems] = useState<Item | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData(`items/${id}`);
      fetchItems(data);
      error &&  console.error("Error fetching all items: ", error);
    }

    fetchData();
  }, [getData]);

  return (
    <div className="p-4">
      <button onClick={() => router.back()} className="mb-4 text-blue-500">
        ← Back
      </button>
      {error ?
        <h1>Item: {id} not available</h1>
        :
        <div className="text-center">
          <img
            src={item?.image}
            alt="Product Image"
            className="w-full h-64 object-cover rounded-lg mb-4"
          />
          <h1 className="text-2xl font-bold">Product {item?.name}</h1>
          <p className="text-gray-500">${item?.price}</p>
          <p className="my-4 text-gray-700">
            Detailed description of Product {item?.condition}. Lorem ipsum dolor sit amet,
            consectetur adipiscing elit.
          </p>

          <div className="flex justify-center space-x-4 mt-4">
            <button className="px-4 py-2 bg-gray-200 rounded-lg">Size: {item?.model}</button>
            <button className="px-4 py-2 bg-gray-200 rounded-lg">Color: Blue</button>
          </div>

          <div className="flex justify-evenly mt-6">
            <button className="px-6 py-3 bg-blue-500 text-white rounded-lg">
              Add to Cart
            </button>
            <button className="px-6 py-3 bg-gray-500 text-white rounded-lg">
              Buy Now
            </button>
          </div>
        </div>
      }
    </div>
  );
}