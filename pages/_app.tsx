import '../app/globals.css';
import dynamic from 'next/dynamic';
import type { AppProps } from 'next/app';
import { FixedNavigation } from '../app/components/index';
import AuthProvider from '../app/context/AuthContext';

const DynamicHeader = dynamic(() => import('@/app/components/Header'), { ssr: false });

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <DynamicHeader />
      <main className="flex-grow">
        <Component {...pageProps} />
        <FixedNavigation />
      </main>
    </AuthProvider>
  );
}

export default MyApp;