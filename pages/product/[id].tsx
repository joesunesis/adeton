// pages/product/[id].tsx
import { useRouter } from 'next/router';

export default function ProductDetail() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div className="p-4">
      <button onClick={() => router.back()} className="mb-4 text-blue-500">
        ← Back
      </button>

      <div className="text-center">
        <img
          src={`/images/product-${id}.jpg`}
          alt="Product Image"
          className="w-full h-64 object-cover rounded-lg mb-4"
        />
        <h1 className="text-2xl font-bold">Product {id}</h1>
        <p className="text-gray-500">$29.99</p>
        <p className="my-4 text-gray-700">
          Detailed description of Product {id}. Lorem ipsum dolor sit amet,
          consectetur adipiscing elit.
        </p>

        <div className="flex justify-center space-x-4 mt-4">
          <button className="px-4 py-2 bg-gray-200 rounded-lg">Size: M</button>
          <button className="px-4 py-2 bg-gray-200 rounded-lg">Color: Blue</button>
        </div>

        <div className="flex justify-between mt-6">
          <button className="px-6 py-3 bg-blue-500 text-white rounded-lg">
            Add to Cart
          </button>
          <button className="px-6 py-3 bg-gray-500 text-white rounded-lg">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}