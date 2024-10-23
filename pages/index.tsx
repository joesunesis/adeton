import { MaxWidthWrapper } from "@/app/components";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <MaxWidthWrapper className='pb-24 pt-10 lg:grid lg:grid-cols-3 lg:gap-x-0 xl:gap-x-8 lg:pt-24 xl:pt-32 lg:pb-52'>
        <div className="flex flex-col items-center justify-center h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url('')` }}>
          <div className="text-center">
            <h1 className="text-7xl font-bold">The best app for your plants</h1>
            <Link href="/signin">
              <button className="mt-8 bg-green-700 text-white py-2 px-6 rounded-lg hover:bg-green-800">Sign in</button>
            </Link>
            <p className="mt-4 text-white">
              Don't have an account?{" "}
              <Link href="/signup">
                <span className="text-green-300 underline justify-center">Create an account</span>
              </Link>
            </p>
          </div>
        </div>
      </MaxWidthWrapper>
    </>
  );
}
