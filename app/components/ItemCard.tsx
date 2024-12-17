import Link from "next/link";
import { Item } from "@/app/types/item";

interface ItemCardProps {
  item: Item;
}

const ItemCard: React.FC<ItemCardProps> = ({ item }) => {
  return (
    <div className="bg-[#EBE9E2] shadow-md rounded-md overflow-hidden">
      <img
        src={item.image}
        alt={item.name}
        width={200}
        height={200}
        className="w-full h-auto shadow-md rounded-b-xl"
      />
      <div className="pt-2">
        <h3 className="text-gray-700 font-semibold text-sm px-2">{item.name}</h3>
      </div>
      <div className="flex items-center justify-between pb-2 px-2">
        <p className="text-green-600 font-bold text-sm">¢ {item.price}.00</p>
        <Link href={`/product/${item.itemId}`} passHref>
          <button className="p-1 text-white bg-green-900">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 4l8 8m0 0l-8 8m8-8H4"
              />
            </svg>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ItemCard;