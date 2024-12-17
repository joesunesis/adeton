import ItemCard from "@/app/components/ItemCard";
import UseFetch from "@/app/core/Fetch";
import { Item } from "@/app/types/item";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export default function SearchPage() {
  const { getData, error } = UseFetch();
  const [items, setItems] = useState<Item[] | null>(null);
  const [searchResults, setSearchResults] = useState<Item[] | null>(null);
  const [searchValue, setSearchValue] = useState('');
  const router = useRouter();

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
    <div>
      <div className="flex items-center justify-around mb-4">
        <button onClick={() => router.back()} className="text-blue-500 bg-[#2c2674] rounded-2xl p-4">
          <span className="hidden md:block">←</span> Back
        </button>
        <input
          autoFocus
          type="text"
          placeholder="Teams/Players, Leagues"
          value={searchValue}
          onChange={handleSearch}
          className="w-9/12 md:w-full bg-[#2c2674] p-4 rounded-lg outline-none text-white placeholder-gray-500"
        />
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4">
        {searchResults && searchResults.length > 0 ? (
          searchResults.map((item) => (
            <ItemCard key={item.itemId} item={item} />
          ))
        ) : (
          <h1 className="text-white text-center col-span-2">No items found</h1>
        )}
      </div>
    </div>
  );
}