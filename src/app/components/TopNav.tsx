import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { Button } from '@/components/button';
import Link from 'next/link';

export default function TopNav() {
  return (
    <div
      className="bg-slate-100 
    flex items-center h-[52px] justify-between px-3 py-2 w-full"
    >
      <Link href="/">
        <h1 className="text-2xl">StageDoor</h1>
      </Link>
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
