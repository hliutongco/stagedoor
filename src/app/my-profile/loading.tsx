import { Skeleton } from '@/components/ui/';

export default function Loading() {
  return (
    <>
      <div className="flex flex-col items-center min-h-[95vh] mt-8 p-4 lg:p-8 pb-20">
        <Skeleton className="bg-secondary h-[60px] lg:h-[75px] rounded-md w-1/3" />
        <Skeleton className="bg-secondary h-[50px] lg:h-[65px] my-2 rounded-md w-1/3" />
        <Skeleton className="bg-secondary h-[30px] lg:h-[50px] my-2 rounded-md w-1/3" />
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <div>
            <Skeleton className="bg-secondary h-[400px] lg:h-[260px] xl:h-[368px] mt-2 rounded-md w-[250px] lg:w-[160px] xl:w-[230px]" />
            <Skeleton className="bg-secondary h-[25px] mt-2 rounded-md w-[150px]" />
          </div>
          <div>
            <Skeleton className="bg-secondary h-[400px] lg:h-[260px] xl:h-[368px] mt-2 rounded-md w-[250px] lg:w-[160px] xl:w-[230px]" />
            <Skeleton className="bg-secondary h-[25px] mt-2 rounded-md w-[150px]" />
          </div>
          <div>
            <Skeleton className="bg-secondary h-[400px] lg:h-[260px] xl:h-[368px] mt-2 rounded-md w-[250px] lg:w-[160px] xl:w-[230px]" />
            <Skeleton className="bg-secondary h-[25px] mt-2 rounded-md w-[150px]" />
          </div>
          <div>
            <Skeleton className="bg-secondary h-[400px] lg:h-[260px] xl:h-[368px] mt-2 rounded-md w-[250px] lg:w-[160px] xl:w-[230px]" />
            <Skeleton className="bg-secondary h-[25px] mt-2 rounded-md w-[150px]" />
          </div>
          <div>
            <Skeleton className="bg-secondary h-[400px] lg:h-[260px] xl:h-[368px] mt-2 rounded-md w-[250px] lg:w-[160px] xl:w-[230px]" />
            <Skeleton className="bg-secondary h-[25px] mt-2 rounded-md w-[150px]" />
          </div>
          <div>
            <Skeleton className="bg-secondary h-[400px] lg:h-[260px] xl:h-[368px] mt-2 rounded-md w-[250px] lg:w-[160px] xl:w-[230px]" />
            <Skeleton className="bg-secondary h-[25px] mt-2 rounded-md w-[150px]" />
          </div>
        </div>
      </div>
    </>
  );
}
