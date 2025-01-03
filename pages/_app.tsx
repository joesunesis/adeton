import '../app/globals.css';
import dynamic from 'next/dynamic';
import type { AppProps } from 'next/app';
import { FixedNavigation, MaxWidthWrapper } from '../app/components/index';
import AuthProvider from '@/app/core/AuthContext';
import { CartProvider } from '@/app/core/CartContext';

const DynamicHeader = dynamic(() => import('@/app/components/Header'), { ssr: false });

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <CartProvider>
        <MaxWidthWrapper className="flex flex-col items-center bg-gray-100">
          {/* Force mobile width */}
          <div className="w-full max-w-sm lg:max-w-tm flex flex-col shadow-md h-full">
            <DynamicHeader />
            <main className="h-screen">
              <Component {...pageProps} />
            </main>
            <FixedNavigation />
          </div>

        </MaxWidthWrapper>
      </CartProvider>
    </AuthProvider>
  );
}

export default MyApp;