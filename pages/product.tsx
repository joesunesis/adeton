import { useRouter } from 'next/router';

export default function ProductDetail() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold">Product Detail</h2>
      <p>Product ID: {id}</p>
      {/* Fetch and display product details using the ID */}
    </div>
  );
};
