import { Categories } from "@/app/components";
import { Products } from "@/app/components";

export default function Home() {
  return (
    <>
      <section className="mb-12">
        <h2 className="text-lg font-semibold mb-2">Shop By Category</h2>
        <Categories />
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-2">Featured Products</h2>
        <Products />
      </section>
    </>
  );
}
