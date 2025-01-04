import { useState, useEffect } from "react";
import UseFetch from "../core/Fetch";
import { Category } from "../types/category";
import { useRouter } from "next/router";

export default function Categories() {
  const { getData, error } = UseFetch();
  const [categories, setCategories] = useState<Category[] | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getData("categories");
        if (data) {
          setCategories(data.slice(0, 4));
        }
      } catch (err) {
        console.error("Error fetching categories: ", err);
      }
    };

    fetchData();
  }, [getData]);

  return (
    <div className="flex overflow-x-auto space-x-4">
      {categories?.map((category) => (
        <div
          onClick={() => router.push(`/category/${category.categoryId}`)}
          key={category?.categoryId}
          className="px-4 rounded-lg text-center border cursor-pointer hover:bg-gray-100"
        >
          <span className="text-sm font-medium">{category.name}</span>
        </div>
      ))}
    </div>
  );
}