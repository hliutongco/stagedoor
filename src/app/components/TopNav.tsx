import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { currentUser } from '@clerk/nextjs/server';
import { Figtree } from 'next/font/google';

const figtree_font = Figtree({ display: 'swap', subsets: ['latin'], weight: '500' });

export default async function TopNav() {
  const user = await currentUser();
  return (
    <div
      className="bg-primary border-b border-black fixed
    flex gap-4 items-center h-[52px] justify-between px-3 py-2 top-0 w-full"
    >
      <Link href="/">
        <h1 className={`text-3xl ${figtree_font.className}`}>StageDoor</h1>
      </Link>
      <div className="flex items-center justify-end w-full">
        {user && (
          <Link className="hover:underline text-lg" href="/my-profile">
            Your Profile
          </Link>
        )}
      </div>
      <div>
        <SignedOut>
          <SignInButton>
            <Button
              className="font-normal hover:underline text-black text-lg"
              size="sm"
              variant="default"
            >
              Sign In
            </Button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  );
}
