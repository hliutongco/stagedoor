'use client';

import ErrorComponent from '@/app/components/Error';

export default function GlobalError({ error }: { error: Error }) {
  return (
    <html lang="en-US">
      <body>
        <ErrorComponent error={error} />
      </body>
    </html>
  );
}
