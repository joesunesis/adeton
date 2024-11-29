// pages/product/[id].tsx
import UseFetch from '@/app/core/Fetch';
import { Item } from '@/app/types/item';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

export default function ProductDetail() {
  const router = useRouter();
  const { id } = router.query;
  const { getData, error } = UseFetch();
  const [item, fetchItems] = useState<Item | null>(null);
  const [selectedImage, setSelectedImage] = useState(item?.image);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData(`items/${id}`);
      fetchItems(data);
      error && console.error("Error fetching all items: ", error);
    }

    fetchData();
  }, [getData]);

  return (
    <div className="p-4">
      <button onClick={() => router.back()} className="mb-4 text-blue-500">
        ← Back
      </button>
      {error ?
        <h1>Item: {id} not available</h1>
        :
    <div className="min-h-screen bg-[#0E0B29] text-white p-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8">
        {/* Left Section - Product Images */}
        <div className="flex-1">
          <div className="mb-4">
            <img
              src={selectedImage}
              alt={item?.name}
              className="w-full h-96 object-cover rounded-lg shadow-lg"
            />
          </div>
          <div className="flex space-x-2 overflow-x-auto">
            <img
                src={item?.image}
                alt={`Thumbnail ${item?.name}`}
                onClick={() => setSelectedImage(item?.image)}
                className={`w-20 h-20 object-cover rounded-lg cursor-pointer transition-transform ${selectedImage === item?.image ? "border-2 border-blue-500 scale-105" : "border border-gray-500"
                  }`}
              />
            {/* {[item?.image, ...item?.additionalImages].map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Thumbnail ${index + 1}`}
                onClick={() => setSelectedImage(img)}
                className={`w-20 h-20 object-cover rounded-lg cursor-pointer transition-transform ${selectedImage === img ? "border-2 border-blue-500 scale-105" : "border border-gray-500"
                  }`}
              />
            ))} */}
          </div>
        </div>

        {/* Right Section - Product Details */}
        <div className="flex-1 space-y-4">
          {/* Product Title */}
          <h1 className="text-2xl font-bold">{item?.name}</h1>
          {/* Ratings */}
          <div className="flex items-center space-x-1 text-yellow-400 text-sm">
            {/* <span>⭐ {item?.rating || "4.7"}</span>
            <span className="text-gray-400">({item?.reviews || "500"} Reviews)</span> */}
          </div>
          {/* Price */}
          <div className="flex items-center space-x-2 text-2xl font-semibold">
            <span className="text-green-400">${item?.price}</span>
            {/* {item?.originalPrice && (
              <span className="line-through text-gray-500">${item?.originalPrice}</span>
            )} */}
          </div>

          {/* Description */}
          {/* <p className="text-gray-300 leading-relaxed">{item?.description}</p> */}

          {/* Specifications */}
          <div className="space-y-2 mt-4">
            <h3 className="text-lg font-semibold text-gray-200">Specifications</h3>
            <ul className="space-y-1 text-gray-400 list-disc list-inside">
              {/* {item?.specifications.map((spec, index) => (
                <li key={index}>{spec}</li>
              ))} */}
            </ul>
          </div>

          {/* Add to Cart Button */}
          <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-semibold mt-6 transition duration-200">
            Add to Cart
          </button>

          {/* Shipping & Warranty Info */}
          <div className="space-y-2 mt-8 text-sm text-gray-400">
            <p className="flex items-center space-x-2">
              <span>🚚</span>
              <span>Free Shipping & Returns</span>
            </p>
            <p className="flex items-center space-x-2">
              <span>🔒</span>
              <span>Secure Payment</span>
            </p>
            <p className="flex items-center space-x-2">
              <span>🛡️</span>
              <span>Hassle-Free Warranty</span>
            </p>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="max-w-6xl mx-auto mt-12">
        <h2 className="text-xl font-semibold text-gray-200 mb-4">Customer Reviews</h2>
        <div className="space-y-4">
          {/* {item?.reviewsList.map((review, index) => (
            <div key={index} className="bg-[#1A173B] p-4 rounded-lg shadow-md">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-yellow-400">⭐ {review.rating}</span>
                  <span className="text-gray-400">by {review.user}</span>
                </div>
                <span className="text-gray-500 text-sm">{review.date}</span>
              </div>
              <p className="text-gray-300 mt-2">{review.comment}</p>
            </div>
          ))} */}
        </div>
      </div>
    </div>
}
</div>
  );
};
