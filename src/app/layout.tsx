import './globals.css';
import TopNav from './components/TopNav';
import { ClerkProvider } from '@clerk/nextjs';
import { TRPCProvider } from '@/server/clients/client-api';
import { Toaster } from '@/components/ui/toaster';

import { Readex_Pro } from 'next/font/google';

const readExPro = Readex_Pro({
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-read-ex-pro',
  weight: ['200', '300', '400', '500', '600'],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <TRPCProvider>
      <ClerkProvider>
        <html lang="en">
          <body className={`font-normal text-black ${readExPro.className}`}>
            <TopNav />
            {children}
            <Toaster />
          </body>
        </html>
      </ClerkProvider>
    </TRPCProvider>
  );
}
