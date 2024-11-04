import { MaxWidthWrapper } from "@/app/components";
import Categories from "@/app/components/Categories";
import ProductList from "./products";

export default function Home() {
  return (
    <>
      <MaxWidthWrapper className='pb-24 lg:grid lg:grid-cols-3 lg:gap-x-0 xl:gap-x-8 lg:pt-24 xl:pt-32 lg:pb-52'>
        <div className="p-4">
          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Shop By Category</h2>
            <div className="flex space-x-4 overflow-x-scroll">
              <Categories />
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">Featured Products</h2>
            <ProductList />
          </section>
        </div>
      </MaxWidthWrapper>
    </>
  );
}
