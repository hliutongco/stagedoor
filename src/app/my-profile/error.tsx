'use client';

import Link from 'next/link';

export default function Error({ error }: { error: Error }) {
  return (
    <div className="errorContainer">
      <div className="error">
        <h2>Internal Error</h2>
        <p>Error Message: {error.message}</p>
      </div>
      Go Back to the <Link href="/">Home Page</Link> or try refreshing
    </div>
  );
}
