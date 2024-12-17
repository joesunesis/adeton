// pages/category/[category].tsx
import { useRouter } from 'next/router';
import Link from 'next/link';
import UseFetch from '@/app/core/Fetch';
import { useState, useEffect } from 'react';
import { Item } from '@/app/types/item';
import ItemCard from '@/app/components/ItemCard';

export default function Category() {
  const { getData, error } = UseFetch();
  const [items, fetchItems] = useState<Item[] | null>(null);
  const router = useRouter();
  const { category } = router.query;
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const items = await getData(`items`);
        fetchItems(items);
      } catch (err) {
        console.error("Error fetching all items: ", err);
      }
    }

    fetchData();
  }, [getData]);

  const filteredItems = items?.filter((item) => {
    return item.category?.categoryId === category;
  });

  return (
    <div className="p-4">
      <button onClick={() => router.back()} className="mb-4 text-blue-500">
        ← Back
      </button>

      <div className="grid grid-cols-2 gap-4">
        {filteredItems?.map((item, index) => (
          <ItemCard item={item} key={index} />
        ))}
      </div>
    </div>
  );
}