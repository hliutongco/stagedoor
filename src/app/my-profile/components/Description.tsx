'use client';

import { Button } from '@/components/ui/';

export default function Description({ description }: { description: string }) {
  return (
    <>
      <p className="text-center">{Boolean(description?.length) && description}</p>
      {!description?.length && (
        <p className="flex flex-col items-center my-4 w-full">
          <span className="italic mb-1 text-muted">Click Edit to add a description</span>
          <Button size="sm" variant="default">
            Edit
          </Button>
        </p>
      )}
    </>
  );
}
