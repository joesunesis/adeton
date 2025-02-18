import { Category } from "../types/category";
import { useRouter } from "next/router";

export default function Categories({ categories }: { categories: Category[] | null }) {
  const router = useRouter();
  return (
    <div className="flex overflow-x-auto space-x-4">
      {categories?.map((category) => (
        <div
          onClick={() => router.push(`/category/${category.name}`)}
          key={category?.categoryId}
          className="px-4 rounded-lg text-center border cursor-pointer hover:bg-gray-100"
        >
          <span className="text-sm font-medium">{category.name}</span>
        </div>
      ))}
    </div>
  );
}