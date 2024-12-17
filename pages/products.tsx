import ItemCard from "@/app/components/ItemCard";
import UseFetch from "@/app/core/Fetch";
import { Item } from "@/app/types/item";
import { useState, useEffect } from "react";

export default function itemList() {
  const { getData, error } = UseFetch();
  const [items, fetchItems] = useState<Item[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData('items');
      fetchItems(data);
      error && console.error("Error fetching all items: ", error);
      }

    fetchData();
  }, [getData]);

  return (
    <div className="mt-4 grid grid-cols-2 gap-4">
        {items?.map((item) => (
          <ItemCard item={item} key={item.itemId} />
        ))}
      </div>
  );
};
