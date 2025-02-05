'use client';

import { useContext } from 'react';
import { IsLoadingContext } from './IsLoadingProvider';
import { Spinner } from '@/components/ui';
import Link from 'next/link';

export default function ReviewBody({
  body,
  displayFullText = false,
  id,
  length = 1000,
}: {
  body: string;
  displayFullText?: boolean;
  id?: string;
  length?: number;
}) {
  const { isLoading } = useContext(IsLoadingContext);
  return (
    <>
      {isLoading && <Spinner className="mt-4" />}
      {!isLoading && !displayFullText && body.length > length && (
        <>
          <p className="whitespace-pre-wrap">
            <span>{body.slice(0, length) + '...'}</span>
          </p>
          <Link
            className="float-right mb-4 text-primary underline w-fit"
            href={`/reviews/${id}`}
          >
            Click to read more
          </Link>
        </>
      )}
      {!isLoading && (displayFullText || body.length < length) && (
        <p className="whitespace-pre-wrap">{body}</p>
      )}
    </>
  );
}
