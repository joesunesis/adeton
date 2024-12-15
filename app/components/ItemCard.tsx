import Link from "next/link";
import { Item } from "@/app/types/item";
import { useRouter } from "next/router";

interface ItemCardProps {
  item: Item;
}

const ItemCard: React.FC<ItemCardProps> = ({ item }) => {
  const router = useRouter();
  const { itemId, name, category, brand, condition, model, stock, image, price } = item;

  return (
    <div className="bg-[#2c2674] rounded-lg p-4 shadow-md">
      <button onClick={() => router.push({
        pathname: `/product/${item.itemId}`,
        query: { id: itemId, name, brand, condition, model, stock, image, price }
      })}>
        <div className="flex flex-col items-center text-center">
          {/* Product Image */}
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-40 object-cover mb-3 rounded-md"
          />
          {/* Rating and Reviews */}
          <div className="flex items-center space-x-1 text-yellow-400 text-sm mb-2">
            <span>⭐ {item.brand || "4.7"}</span> {/* Placeholder rating */}
            <span className="text-gray-400">({item.model || "500"})</span> {/* Placeholder reviews */}
          </div>
          {/* Product Name */}
          <h3 className="text-white text-lg font-semibold mb-2">{item.name}</h3>
          {/* Product Specifications */}
          <p className="text-gray-500 text-sm">4-mic ENC HD Voice</p>
          <p className="text-gray-500 text-sm">30dB ANC Noise Cancellation</p>
          {/* Price and Discount */}
          <div className="flex items-center space-x-2 mt-2">
            <span className="text-green-400 font-semibold">${item.price}</span>
            {/* {item.originalPrice && (
              <span className="line-through text-gray-500">${item.originalPrice}</span>
            )} */}
          </div>
        </div>
      </button>
    </div>
  );
};

export default ItemCard;