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
        <MaxWidthWrapper>
            <DynamicHeader />
            <main className="p-8">
              <Component {...pageProps} />
            </main>
            <FixedNavigation />

        </MaxWidthWrapper>
      </CartProvider>
    </AuthProvider>
  );
}

export default MyApp;