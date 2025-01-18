import UseFetch from '@/app/core/Fetch';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { Category } from "@/app/types/category";

export default function Categories() {
  const { getData, error } = UseFetch();
  const [categories, setCategories] = useState<Category[] | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getData("categories");
        setCategories(data);
      } catch (err) {
        console.error("Error fetching categories:", error || err);
      }
    };

    fetchData();
  }, [getData, error]);

  return (
    <>
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Explore Categories</h2>

      {categories ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((category) => (
            <div
              key={category.categoryId}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transform transition-transform hover:scale-105 overflow-hidden"
            >
              <img
                src={category.imageUrl}
                alt={category.name}
                className="w-full h-60 object-cover"
              />
              <div
                onClick={() => router.push(`/category/${category.categoryId}`)}
                className="p-4 text-center cursor-pointer hover:bg-green-100"
              >
                <p className="text-lg font-medium text-gray-700">{category.name}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">Loading categories...</p>
      )}
    </>
  );
}