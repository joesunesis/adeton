import ItemCard from '@/app/components/ItemCard';
import UseFetch from '@/app/core/Fetch';
import { Item } from '@/app/types/item';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Category() {
  const { getData, error } = UseFetch();
  const [items, fetchItems] = useState<Item[] | null >(null);
  const router = useRouter();
  const { category } = router.query;

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData(`items`);
      if (error) console.error("Error fetching all items: ", error)
      else fetchItems(data);
    }

    fetchData();
  }, [getData, error]);

  const filteredItems = items?.filter((item) => {
    return item.category === category;
  });

  return (
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 tm:grid-cols-3 gap-4">
        {filteredItems?.map((item) => (
          <ItemCard item={item} key={item.itemId} />
        ))}
      </div>
  );
}