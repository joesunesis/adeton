import Link from "next/link";
import { Item } from "@/app/types/item";

interface ItemCardProps {
  item: Item;
}

const ItemCard: React.FC<ItemCardProps> = ({ item }) => {
  return (
    <div className="bg-[#282450] rounded-lg p-4 shadow-md text-[#E7E7E9]">
      <Link href={`/product/${item.itemId}`}>
        <div className="flex flex-col items-center text-center">
          {/* Product Image */}
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-40 object-cover mb-3 rounded-md"
          />
          {/* Rating and Reviews */}
          <div className="flex items-center space-x-1 text-yellow-400 text-sm mb-2">
            <span>⭐ {item.brand || "4.7"}</span>
            <span>({item.model || "500"})</span>
          </div>
          {/* Product Name */}
          <h3 className="text-white text-lg font-semibold mb-2">{item.name}</h3>
          {/* Product Specifications */}
          <p className="text-sm">4-mic ENC HD Voice</p>
          <p className="text-sm">30dB ANC Noise Cancellation</p>
          {/* Price and Discount */}
          <div className="flex items-center space-x-2 mt-2">
            <span className="text-green-400 font-semibold">${item.price}</span>
            {/* {item.originalPrice && (
              <span className="line-through text-gray-500">${item.originalPrice}</span>
            )} */}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ItemCard;