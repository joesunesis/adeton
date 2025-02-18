import { Item } from "@/app/types/item";
import ItemCard from "@/app/components/ItemCard";

const Products = ({ items }: { items: Item[] | null }) => {
  return (
    <div className="mt-4 grid grid-cols-2 gap-4">
      {items?.map((item) => (
        <ItemCard item={item} key={item.itemId} />
      ))}
    </div>
  );
};

export default Products;