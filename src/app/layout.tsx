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
          <body className={`font-normal pt-10 text-black sm:text-sm md:text-base ${readExPro.className}`}>
            <TopNav />
            {children}
            <Toaster />
            <footer className="bg-black flex gap-6 items-center justify-between p-3 row-start-3 text-primary">
              <span className="text-sm">made by helen ♡</span>
              <div className="flex gap-4">
                <p>About</p>
                <p>Contact Us</p>
              </div>
            </footer>
          </body>
        </html>
      </ClerkProvider>
    </TRPCProvider>
  );
}
