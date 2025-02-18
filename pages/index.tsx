import { Categories, Products, Spinner } from "@/app/components";
import UseFetch from "@/app/core/Fetch";
import { useEffect, useState } from "react";
import { Item } from "@/app/types/item";
import { Category } from "@/app/types/category";

export default function Home() {
  const { getData, error, loading } = UseFetch();
  const [items, setItems] = useState<Item[] | null>(null);
  const [categories, setCategories] = useState<Category[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoryData, productData] = await Promise.all([
          getData("categories"),
          getData("items"),
        ]);
        setCategories(categoryData);
        setItems(productData);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, []);

  if (loading) return <Spinner />;

  return (
    <>
      <section className="mb-12">
        <h2 className="text-lg font-semibold mb-2">Shop By Category</h2>
        <Categories categories={categories} />
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-2">Featured Products</h2>
        <Products items={items} />
      </section>
    </>
  );
}