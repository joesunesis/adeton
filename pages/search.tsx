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
      error && console.error("Error fetching all items: ", error);
    };

    fetchData();
  }, [getData]);

  const keydown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch(e);
  };

  const handleSearch = (e: React.FormEvent | React.KeyboardEvent) => {
    e.preventDefault();
    if (items) {
      const results = items.filter((i) =>
        i.name.toLowerCase().includes(searchValue.toLowerCase())
      );
      setSearchResults(results);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center space-x-4 mb-4">
        <button onClick={() => router.back()} className="text-blue-500 bg-[#2c2674] rounded-2xl p-4">
          <span className="hidden md:block">←</span> Back
        </button>
        <i className="m-input-wap-icon m-input-wap-icon--clickable m-input-wap-icon--show m-icon-delete bg-white"></i>
        <input
          autoFocus
          type="text"
          placeholder="Teams/Players, Leagues"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyUp={keydown}
          className="w-9/12 md:w-full bg-[#2c2674] p-4 rounded-lg outline-none text-white placeholder-gray-500"
        />
        <button onClick={handleSearch} className="text-blue-500 text-sm bg-[#2c2674] p-4 rounded-2xl">
          Search
        </button>
      </div>

      {/* Search Results */}
      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
        {searchResults?.map((item) => (
          <ItemCard key={item.itemId} item={item} />
        ))}
      </div>
    </div>
  );
}