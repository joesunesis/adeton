import { MaxWidthWrapper } from '@/app/components';
import Link from 'next/link';
import { useState, useEffect } from 'react';

interface Category {
  id: number;
  name: string;
}

export default function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    setCategories([
      { id: 1, name: 'Electronics' },
      { id: 2, name: 'Clothing' },
      { id: 3, name: 'Home Appliances' },
    ]);
  }, []);

  return (
    <MaxWidthWrapper className='p-4'>
      <h2 className="text-lg font-bold mb-4">Categories</h2>
      <ul>
        {categories.map((category) => (
          <li key={category.id} className="mb-4">
            <div className="p-4 bg-white shadow rounded-lg">
              <h3 className="text-lg">
                <Link href={`/category/${category.name.toLowerCase()}`}>
                  {category.name}
                </Link>
              </h3>
            </div>
          </li>
        ))}
      </ul>
    </MaxWidthWrapper>
  );
};