// pages/category/[category].tsx
import { useRouter } from 'next/router';
import UseFetch from '@/app/core/Fetch';
import { useState, useEffect } from 'react';
import { Item } from '@/app/types/item';
import ItemCard from '@/app/components/ItemCard';

export default function Category() {
  const { getData, error } = UseFetch();
  const [items, fetchItems] = useState<Item[] | null>(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData(`items`);
      error ?
        console.error("Error fetching all items: ", error) :
        fetchItems(data);
    }

    fetchData();
  }, [getData]);

  const filteredItems = items?.filter((item) => {
    return item.category?.categoryId === id;
  });

  return (
    <div className="p-4">
      <button onClick={() => router.back()} className="mb-4 text-blue-500">
        ← Back
      </button>
      <div className="mt-4 grid grid-cols-2 gap-4">
        {items?.map((item) => (
          <ItemCard item={item} key={item.itemId} />
        ))}
      </div>
    </div>
  );
}