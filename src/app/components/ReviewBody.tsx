'use client';

import { useContext, useMemo } from 'react';
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
  const isFullTextDisplayed = useMemo(() => {
    return displayFullText || body.length <= length;
  }, [body, displayFullText, length]);
  const displayedText = useMemo(() => {
    if (isFullTextDisplayed) {
      return body;
    }
    return body.slice(0, length) + '...';
  }, [body, isFullTextDisplayed, length]);
  return (
    <>
      {isLoading && <Spinner className="mt-4" />}
      {!isLoading && !isFullTextDisplayed && (
        <>
          <p className="whitespace-pre-wrap">
            <span>{displayedText}</span>
          </p>
          <Link
            className="float-right mb-4 text-primary underline w-fit"
            href={`/reviews/${id}`}
          >
            Click to read more
          </Link>
        </>
      )}
      {!isLoading && isFullTextDisplayed && (
        <p className="whitespace-pre-wrap">{displayedText}</p>
      )}
    </>
  );
}
