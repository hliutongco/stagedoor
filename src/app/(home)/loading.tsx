import { Skeleton } from '@/components/ui/';

export default function Loading() {
  return (
    <div className="min-h-screen mb-10 sm:p-10">
      <div className="flex flex-col items-center">
        <Skeleton className="bg-secondary h-[50px] lg:h-[75px] rounded-md sm:w-3/4 lg:w-1/3" />
      </div>
      <Skeleton className="bg-secondary h-[30px] lg:h-[50px] mt-4 lg:mt-8 rounded-md w-[200px]" />
      <div className="items-center justify-items-center min-h-screen sm:p-4 lg:p-8">
        <div className="grid sm:grid-cols-3 lg:grid-cols-5 gap-4">
          <div>
            <Skeleton className="bg-secondary h-[170px] md:h-[276px] lg:h-[200px] xl:h-[276px] mt-2 rounded-md sm:w-[120px] md:w-[175px] lg:w-[150px] xl:w-[175px]" />
            <Skeleton className="bg-secondary h-[25px] mt-2 rounded-md sm:w-[100px] lg:w-[150px]" />
          </div>
          <div>
            <Skeleton className="bg-secondary h-[170px] md:h-[276px] lg:h-[200px] xl:h-[276px] mt-2 rounded-md sm:w-[120px] md:w-[175px] lg:w-[150px] xl:w-[175px]" />
            <Skeleton className="bg-secondary h-[25px] mt-2 rounded-md sm:w-[100px] lg:w-[150px]" />
          </div>
          <div>
            <Skeleton className="bg-secondary h-[170px] md:h-[276px] lg:h-[200px] xl:h-[276px] mt-2 rounded-md sm:w-[120px] md:w-[175px] lg:w-[150px] xl:w-[175px]" />
            <Skeleton className="bg-secondary h-[25px] mt-2 rounded-md sm:w-[100px] lg:w-[150px]" />
          </div>
          <div className="hidden lg:block">
            <Skeleton className="bg-secondary h-[170px] md:h-[276px] lg:h-[200px] xl:h-[276px] mt-2 rounded-md sm:w-[120px] md:w-[175px] lg:w-[150px] xl:w-[175px]" />
            <Skeleton className="bg-secondary h-[25px] mt-2 rounded-md sm:w-[100px] lg:w-[150px]" />
          </div>
          <div className="hidden lg:block">
            <Skeleton className="bg-secondary h-[170px] md:h-[276px] lg:h-[200px] xl:h-[276px] mt-2 rounded-md sm:w-[120px] md:w-[175px] lg:w-[150px] xl:w-[175px]" />
            <Skeleton className="bg-secondary h-[25px] mt-2 rounded-md sm:w-[100px] lg:w-[150px]" />
          </div>
        </div>
      </div>
    </div>
  );
}
