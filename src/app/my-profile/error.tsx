'use client';

import ErrorComponent from '@/app/components/Error';

export default function Error({ error }: { error: Error }) {
  return (
    <ErrorComponent error={error} />
  );
}
