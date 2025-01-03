import './globals.css';
import TopNav from './components/TopNav';
import { ClerkProvider } from '@clerk/nextjs';
import { TRPCProvider } from '@/server/clients/client-api';
// import { trpc } from '../lib/utils/create-trpc';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <TRPCProvider>
      <ClerkProvider>
        <html lang="en">
          <body>
            <TopNav />
            {children}
          </body>
        </html>
      </ClerkProvider>
    </TRPCProvider>
  );
}

// export default trpc.withTRPC(RootLayout);
