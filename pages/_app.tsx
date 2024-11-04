import '../app/globals.css';
import dynamic from 'next/dynamic';
import type { AppProps } from 'next/app';
import { FixedNavigation } from '../app/components/index';
import AuthProvider from '../app/core/AuthContext';
import Footer from '@/app/components/Footer';

const DynamicHeader = dynamic(() => import('@/app/components/Header'), { ssr: false });

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <DynamicHeader />
      <main className="flex-grow min-h-screen bg-[#100E26] text-white p-4">
        <Component {...pageProps} />
      </main>
      <FixedNavigation />
      <Footer />
    </AuthProvider>
  );
}

export default MyApp;