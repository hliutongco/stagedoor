import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <>
      <h1>
        <Skeleton className="h-[25px] w-[200px] rounded-md" />
      </h1>
      <div className="items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
        <div className="grid grid-cols-4 gap-4">
          <div>
            <Skeleton className="h-[315px] mt-2 rounded-md w-[200px]" />
            <Skeleton className="h-[25px] mt-2 rounded-md w-[150px]" />
          </div>
          <div>
            <Skeleton className="h-[315px] mt-2 rounded-md w-[200px]" />
            <Skeleton className="h-[25px] mt-2 rounded-md w-[150px]" />
          </div>
          <div>
            <Skeleton className="h-[315px] mt-2 rounded-md w-[200px]" />
            <Skeleton className="h-[25px] mt-2 rounded-md w-[150px]" />
          </div>
          <div>
            <Skeleton className="h-[315px] mt-2 rounded-md w-[200px]" />
            <Skeleton className="h-[25px] mt-2 rounded-md w-[150px]" />
          </div>
        </div>
      </div>
    </>
  );
}
