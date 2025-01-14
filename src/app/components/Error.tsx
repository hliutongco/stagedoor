import Link from 'next/link';

export default function ErrorComponent({ error }: { error: Error }) {
  return (
    <div className="errorContainer h-screen p-8 text-center">
      <div className="error flex flex-col gap-4 mt-10">
        <h2 className="text-xl">Internal Error</h2>
        <p>{error.message}</p>
        <p>
          Go Back to the{' '}
          <Link className="hover:underline text-primary" href="/">
            Home Page
          </Link>{' '}
          or try refreshing
        </p>
      </div>
    </div>
  );
}
