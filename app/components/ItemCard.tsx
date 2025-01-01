import { Item } from "@/app/types/item";
import { useRouter } from "next/router";

interface ItemCardProps {
  item: Item;
}

const ItemCard: React.FC<ItemCardProps> = ({ item }) => {
  const router = useRouter();
  const { itemId, name, brand, condition, model, stock, image, price, category } = item;

  return (
    <div className="bg-[#EBE9E2] shadow-md rounded-sm overflow-hidden">
      <img
        src={image}
        alt={name}
        width={200}
        height={200}
        className="w-full h-auto shadow-md rounded-b-sm"
      />
      <div className="pt-2">
        <h3 className="text-gray-700 font-semibold text-sm px-2">{name}</h3>
      </div>
      <div className="flex items-center justify-between pb-2 px-2">
        <p className="text-green-600 font-bold text-sm">¢{price.toFixed(2)}</p>
        <button className="p-1 text-white bg-green-900" onClick={() => router.push({ pathname: `/product/${itemId}`, query: { id: itemId, name, brand, condition, model, stock, image, price, cat_name: category?.name, cat_id: category?.categoryId }})}>
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
      </div>
    </div>
  );
};

export default ItemCard;