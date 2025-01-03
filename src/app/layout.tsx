import './globals.css';
import TopNav from './components/TopNav';
import { ClerkProvider } from '@clerk/nextjs';
import { TRPCProvider } from '@/server/clients/client-api';
import { Toaster } from '@/components/toaster';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <TRPCProvider>
      <ClerkProvider>
        <html lang="en">
          <body>
            <TopNav />
            {children}
            <Toaster />
          </body>
        </html>
      </ClerkProvider>
    </TRPCProvider>
  );
}
