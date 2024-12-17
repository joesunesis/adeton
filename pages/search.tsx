import ItemCard from "@/app/components/ItemCard";
import UseFetch from "@/app/core/Fetch";
import { Item } from "@/app/types/item";
import React, { useEffect, useState } from "react";

export default function SearchPage() {
  const { getData, error } = UseFetch();
  const [searchValue, setSearchValue] = useState('');
  const [items, setItems] = useState<Item[] | null>(null);
  const [searchResults, setSearchResults] = useState<Item[] | null>(null);

  // Fetch data once on component mount
  useEffect(() => {
    const fetchData = async () => {
      const data = await getData("items");
      setItems(data);
      if (error) console.error("Error fetching all items: ", error);
    };

    fetchData();
  }, [getData]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);

    if (!value) {
      setSearchResults(null);
      return;
    }

    if (items) {
      const results = items.filter((i) =>
        i.brand.toLowerCase().includes(value.toLowerCase()) ||
        i.model.toLowerCase().includes(value.toLowerCase()) ||
        i.condition.toLowerCase().includes(value.toLowerCase()) ||
        i.name.toLowerCase().includes(value.toLowerCase())
      );
      setSearchResults(results);
    }
  };

  return (
    <div className="p-4">
      <div className="flex items-center">
        <input
          autoFocus
          type="text"
          placeholder="Search Items..."
          value={searchValue}
          onChange={handleSearch}
          className="w-full bg-green-100 p-4 rounded-lg outline-1 placeholder-gray-500"
        />
      </div>

      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
        {searchResults?.map((item) => (
          <ItemCard key={item.itemId} item={item} />
        ))}
      </div>
    </div>
  );
}