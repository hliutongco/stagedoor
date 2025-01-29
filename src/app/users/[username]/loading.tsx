import { Skeleton } from '@/components/ui/';

export default function Loading() {
  return (
    <>
      <div className="gap-16 items-center justify-items-center min-h-screen mt-8 p-4 lg:p-8 pb-20">
        <Skeleton className="bg-secondary h-[50px] lg:h-[65px] rounded-md w-1/3" />
        <Skeleton className="bg-secondary h-[60px] lg:h-[75px] my-1 rounded-md w-1/3" />
        <Skeleton className="bg-secondary h-[10px] lg:h-[20px] my-2 rounded-md w-1/3" />
        <Skeleton className="bg-secondary h-[30px] lg:h-[50px] my-2 rounded-md w-1/3" />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <div>
            <Skeleton className="bg-secondary h-[235px] lg:h-[200px] xl:h-[276px] mt-2 rounded-md w-[150px] xl:w-[175px]" />
            <Skeleton className="bg-secondary h-[25px] mt-2 rounded-md w-[150px]" />
          </div>
          <div>
            <Skeleton className="bg-secondary h-[235px] lg:h-[200px] xl:h-[276px] mt-2 rounded-md w-[150px] xl:w-[175px]" />
            <Skeleton className="bg-secondary h-[25px] mt-2 rounded-md w-[150px]" />
          </div>
          <div>
            <Skeleton className="bg-secondary h-[235px] lg:h-[200px] xl:h-[276px] mt-2 rounded-md w-[150px] xl:w-[175px]" />
            <Skeleton className="bg-secondary h-[25px] mt-2 rounded-md w-[150px]" />
          </div>
          <div>
            <Skeleton className="bg-secondary h-[235px] lg:h-[200px] xl:h-[276px] mt-2 rounded-md w-[150px] xl:w-[175px]" />
            <Skeleton className="bg-secondary h-[25px] mt-2 rounded-md w-[150px]" />
          </div>
          <div>
            <Skeleton className="bg-secondary h-[235px] lg:h-[200px] xl:h-[276px] mt-2 rounded-md w-[150px] xl:w-[175px]" />
            <Skeleton className="bg-secondary h-[25px] mt-2 rounded-md w-[150px]" />
          </div>
          <div>
            <Skeleton className="bg-secondary h-[235px] lg:h-[200px] xl:h-[276px] mt-2 rounded-md w-[150px] xl:w-[175px]" />
            <Skeleton className="bg-secondary h-[25px] mt-2 rounded-md w-[150px]" />
          </div>
        </div>
      </div>
    </>
  );
}
