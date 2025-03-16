import { Skeleton } from '@/components/ui/';

export default function Loading() {
  return (
    <div className="flex flex-col min-h-[95vh] mt-6 p-4 lg:p-8 pb-20">
      <Skeleton className="bg-secondary h-[50px] lg:h-[65px] rounded-md w-1/3" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 items-center mt-4">
        <div>
          <Skeleton className="bg-secondary h-[325px] md:h-[350px] lg:h-[400px] xl:h-[500px] mt-2 rounded-md w-[290px] md:w-[300px] lg:w-[310px] xl:w-[340px]" />
        </div>
        <div>
          <Skeleton className="bg-secondary h-[325px] md:h-[350px] lg:h-[400px] xl:h-[500px] mt-2 rounded-md w-[290px] md:w-[300px] lg:w-[310px] xl:w-[340px]" />
        </div>
        <div>
          <Skeleton className="bg-secondary h-[325px] md:h-[350px] lg:h-[400px] xl:h-[500px] mt-2 rounded-md w-[290px] md:w-[300px] lg:w-[310px] xl:w-[340px]" />
        </div>
        <div>
          <Skeleton className="bg-secondary h-[325px] md:h-[350px] lg:h-[400px] xl:h-[500px] mt-2 rounded-md w-[290px] md:w-[300px] lg:w-[310px] xl:w-[340px]" />
        </div>
      </div>
    </div>
  );
}
