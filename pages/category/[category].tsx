// pages/category/[category].tsx
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Category() {
  const router = useRouter();
  const { category } = router.query;

  return (
    <div className="p-4">
      <button onClick={() => router.back()} className="mb-4 text-blue-500">
        ← Back
      </button>
      <h1 className="text-2xl font-bold capitalize mb-4">{category} Fashion</h1>

      <div className="grid grid-cols-2 gap-4">
        {[1, 2, 3, 4].map((id) => (
          <Link href={`/product/${id}`} key={id} className="block p-4 bg-white shadow rounded-lg">
              <img
                src={`/images/product-${id}.jpg`}
                alt="Product Image"
                className="w-full h-32 object-cover mb-2 rounded"
              />
              <h3 className="font-semibold">Product {id}</h3>
              <p className="text-gray-500">$29.99</p>
          </Link>
        ))}
      </div>
    </div>
  );
}