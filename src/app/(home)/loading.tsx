import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className="min-h-screen mb-10 sm:p-10">
      <div className="flex flex-col items-center">
        <Skeleton className="bg-secondary h-[75px] rounded-md sm:w-3/4 lg:w-1/3" />
      </div>
      <Skeleton className="bg-secondary h-[50px] mt-10 rounded-md w-[200px]" />
      <div className="items-center justify-items-center min-h-screen sm:p-4 lg:p-8">
        <div className="grid sm:grid-cols-3 lg:grid-cols-5 gap-4">
          <div>
            <Skeleton className="bg-secondary sm:h-[170px] lg:h-[276px] mt-2 rounded-md sm:w-[120px] lg:w-[175px]" />
            <Skeleton className="bg-secondary h-[25px] mt-2 rounded-md sm:w-[100px] lg:w-[150px]" />
          </div>
          <div>
            <Skeleton className="bg-secondary sm:h-[170px] lg:h-[276px] mt-2 rounded-md sm:w-[120px] lg:w-[175px]" />
            <Skeleton className="bg-secondary h-[25px] mt-2 rounded-md sm:w-[100px] lg:w-[150px]" />
          </div>
          <div>
            <Skeleton className="bg-secondary sm:h-[170px] lg:h-[276px] mt-2 rounded-md sm:w-[120px] lg:w-[175px]" />
            <Skeleton className="bg-secondary h-[25px] mt-2 rounded-md sm:w-[100px] lg:w-[150px]" />
          </div>
          <div>
            <Skeleton className="bg-secondary sm:h-[170px] lg:h-[276px] mt-2 rounded-md sm:w-[120px] lg:w-[175px]" />
            <Skeleton className="bg-secondary h-[25px] mt-2 rounded-md sm:w-[100px] lg:w-[150px]" />
          </div>
          <div>
            <Skeleton className="bg-secondary sm:h-[170px] lg:h-[276px] mt-2 rounded-md sm:w-[120px] lg:w-[175px]" />
            <Skeleton className="bg-secondary h-[25px] mt-2 rounded-md sm:w-[100px] lg:w-[150px]" />
          </div>
        </div>
      </div>
    </div>
  );
}
