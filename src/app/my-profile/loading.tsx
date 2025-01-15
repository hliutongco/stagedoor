import { Skeleton } from '@/components/ui/';

export default function Loading() {
  return (
    <>
      <div className="gap-16 items-center justify-items-center min-h-screen mt-10 sm:p-4 lg:p-8 pb-20">
        <Skeleton className="bg-secondary h-[75px] rounded-md w-1/3" />
        <Skeleton className="bg-secondary h-[50px] my-4 rounded-md w-1/3" />
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <div>
            <Skeleton className="bg-secondary h-[276px] mt-2 rounded-md w-[175px]" />
            <Skeleton className="bg-secondary h-[25px] mt-2 rounded-md w-[150px]" />
          </div>
          <div>
            <Skeleton className="bg-secondary h-[276px] mt-2 rounded-md w-[175px]" />
            <Skeleton className="bg-secondary h-[25px] mt-2 rounded-md w-[150px]" />
          </div>
          <div>
            <Skeleton className="bg-secondary h-[276px] mt-2 rounded-md w-[175px]" />
            <Skeleton className="bg-secondary h-[25px] mt-2 rounded-md w-[150px]" />
          </div>
          <div>
            <Skeleton className="bg-secondary h-[276px] mt-2 rounded-md w-[175px]" />
            <Skeleton className="bg-secondary h-[25px] mt-2 rounded-md w-[150px]" />
          </div>
          <div>
            <Skeleton className="bg-secondary h-[276px] mt-2 rounded-md w-[175px]" />
            <Skeleton className="bg-secondary h-[25px] mt-2 rounded-md w-[150px]" />
          </div>
          <div>
            <Skeleton className="bg-secondary h-[276px] mt-2 rounded-md w-[175px]" />
            <Skeleton className="bg-secondary h-[25px] mt-2 rounded-md w-[150px]" />
          </div>
        </div>
      </div>
    </>
  );
}
