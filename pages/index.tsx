import { MaxWidthWrapper } from "@/app/components";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <MaxWidthWrapper className='pb-24 pt-10 lg:grid lg:grid-cols-3 lg:gap-x-0 xl:gap-x-8 lg:pt-24 xl:pt-32 lg:pb-52'>
        <div className="p-4">
          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Shop By Category</h2>
            <div className="flex space-x-4 overflow-x-scroll">
              {['Women', 'Men', 'Teens', 'Kids'].map((category) => (
                <Link href={`/category/${category.toLowerCase()}`} key={category} className="p-2 bg-gray-100 rounded-lg text-center">
                  {category}
                </Link>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">Featured Products</h2>
            <div className="grid grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((id) => (
                <Link href={`/product/${id}`} key={id} className="block p-4 bg-white shadow rounded-lg">
                  <img
                    src={`/images/product-${id}.jpg`}
                    alt="Product Image"
                    className="w-full h-32 object-cover mb-2 rounded"
                  />
                  <h3 className="font-semibold">Product {id}</h3>
                  <p className="text-gray-500">$29.99</p>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </MaxWidthWrapper>
    </>
  );
}
