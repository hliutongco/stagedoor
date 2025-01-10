import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { currentUser } from '@clerk/nextjs/server';

export default async function TopNav() {
  const user = await currentUser();
  return (
    <div
      className="bg-slate-100 
    flex gap-4 items-center h-[52px] justify-between px-3 py-2 w-full"
    >
      <Link href="/">
        <h1 className="text-2xl">StageDoor</h1>
      </Link>
      <div className="flex items-center justify-end w-full">
        {user && <Link href="/my-profile">Your Profile</Link>}
      </div>
      <div>
        <SignedOut>
          <SignInButton>
            <Button size="sm" variant="default">
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
