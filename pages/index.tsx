import { MaxWidthWrapper } from "@/app/components";
import Categories from "@/app/components/Categories";
import ProductList from "./products";

export default function Home() {
  return (
    <MaxWidthWrapper className='p-4'>
        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Shop By Category</h2>
            <Categories />
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-2">Featured Products</h2>
          <ProductList />
        </section>
    </MaxWidthWrapper>
  );
}
