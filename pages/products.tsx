import ItemCard from "@/app/components/ItemCard";
import UseFetch from "@/app/core/Fetch";
import { Item } from "@/app/types/item";
import { useState, useEffect } from "react";

export default function ProductList() {
  const { getData, error } = UseFetch();
  const [items, fetchItems] = useState<Item[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getData('items');
        fetchItems(data);
      } catch (err) {
        console.error("Error fetching all items: ", err);
      }
    }

    fetchData();
  }, [getData]);

  return (
    <div className="mt-4 grid grid-cols-2 gap-4">
      {items?.map((item, index) => (
        <ItemCard item={item} key={index} />
      ))}
    </div>
  );
};
