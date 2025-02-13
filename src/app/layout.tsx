import './globals.css';
import TopNav from './components/TopNav';
import { ClerkProvider } from '@clerk/nextjs';
import { TRPCProvider } from '@/server/clients/client-api';
import { Toaster } from '@/components/ui/';

import { Readex_Pro } from 'next/font/google';
import Link from 'next/link';

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
          <body
            className={`font-normal pt-10 text-black text-sm md:text-base ${readExPro.className}`}
          >
            <TopNav />
            {children}
            <Toaster />
            <footer className="bg-primary border-t border-black flex gap-6 items-center justify-between p-3 row-start-3">
              <span className="text-sm">made by helen ♡</span>
              <div className="flex gap-4">
                <Link href="/privacy-policy">Privacy Policy</Link>
              </div>
            </footer>
          </body>
        </html>
      </ClerkProvider>
    </TRPCProvider>
  );
}
