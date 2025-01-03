'use client';
import { Button } from '@/components/button';

export default function WatchedButton({ id }: { id: string }) {
  return (
    <Button
      onClick={() => {
        console.log(id);
      }}
    >
      I&apos;ve seen this!
    </Button>
  );
}
