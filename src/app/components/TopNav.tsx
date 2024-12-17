import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'
import { Button } from '@/components/button'

export default function TopNav() {
  return (
    <div className='bg-slate-100 flex items-center justify-between p-2 w-full'>
      <h1>StageDoor</h1>
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
  )
}