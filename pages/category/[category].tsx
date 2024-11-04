// pages/category/[category].tsx
import { useRouter } from 'next/router';
import Link from 'next/link';
import UseFetch from '@/app/core/Fetch';
import { useState, useEffect } from 'react';
import { Category } from '@/app/types/category';

export default function Category() {
  const router = useRouter();
  const { category } = router.query;
  const { getData, error } = UseFetch();
  const [item, fetchItems] = useState<Category | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getData(`categories/${category}`);
        fetchItems(data);
      } catch (err) {
        console.error("Error fetching all items: ", err);
      }
    }

    fetchData();
  }, [getData]);

  return (
    <div className="p-4">
      <button onClick={() => router.back()} className="mb-4 text-blue-500">
        ← Back
      </button>
      <h1 className="text-2xl font-bold capitalize mb-4">{item?.name}</h1>

      <div className="grid grid-cols-2 gap-4">
        <Link href={`/product/${category}`} className="block p-4 bg-white shadow rounded-lg">
          <img
            src={item?.imageUrl}
            alt="Product Image"
            className="w-full h-32 object-cover mb-2 rounded"
          />
          <h3 className="font-semibold">Product {category}</h3>
          <p className="text-gray-500">$29.99</p>
        </Link>
      </div>
    </div>
  );
}