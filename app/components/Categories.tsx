import Link from "next/link";
import { useState, useEffect } from "react";
import UseFetch from "../core/Fetch";
import { Category } from "../types/category";

export default function Categories() {
  const { getData, error } = UseFetch();
  const [categories, setCategories] = useState<Category[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData("categories");
      setCategories(data);
      error &&  console.error("Error fetching categories: ", error);
    };

    fetchData();
  }, [getData]);

  return (
    <div className="flex overflow-x-auto space-x-4 py-2">
      {categories?.map((category, i) => (
        <Link href={`/category/${category.categoryId}`} key={i} className="p-2 bg-gray-100 rounded-lg text-center">
          <span className="text-sm">{category.name}</span>
        </Link>
      ))}
    </div>
  );
}