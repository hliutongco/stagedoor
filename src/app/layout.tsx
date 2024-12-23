import './globals.css';
import TopNav from './components/TopNav';
import { ClerkProvider } from '@clerk/nextjs';
// import { trpc } from '../lib/utils/create-trpc';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <TopNav />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}

// export default trpc.withTRPC(RootLayout);
