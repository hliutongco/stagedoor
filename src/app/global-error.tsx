'use client';

import Link from 'next/link';

export default function GlobalError({ error }: { error: Error }) {
  return (
    <html>
      <body>
        <div className="globalErrorContainer">
          <div className="globalError">
            <h2>Internal Error</h2>
            <p>Error Message: {error.message}</p>
          </div>
          Go Back to the <Link href="/">Home Page</Link>
        </div>
      </body>
    </html>
  );
}
