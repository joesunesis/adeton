import '../app/globals.css';
import type { AppProps } from 'next/app';
import { FixedNavigation } from '../app/components/index';
import AuthProvider from '../app/context/AuthContext';


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
        <main className="flex-grow">
        <Component {...pageProps} />
        <FixedNavigation />
        </main>
    </AuthProvider>
  );
}

export default MyApp;