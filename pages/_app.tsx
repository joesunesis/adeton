import '../app/globals.css';
import dynamic from 'next/dynamic';
import type { AppProps } from 'next/app';
import { FixedNavigation, MaxWidthWrapper } from '../app/components/index';
import AuthProvider from '@/app/core/AuthContext';

const DynamicHeader = dynamic(() => import('@/app/components/Header'), { ssr: false });

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <MaxWidthWrapper className="flex flex-col items-center">
        {/* Force mobile width */}
        <MaxWidthWrapper className="max-w-md lg:max-w-tm">
          <DynamicHeader />
          <main className="p-8">
            <Component {...pageProps} />
          </main>
          <FixedNavigation />
        </MaxWidthWrapper>

      </MaxWidthWrapper>
    </AuthProvider>
  );
}

export default MyApp;