import { Skeleton } from '@/components/ui/';

export default function Loading() {
  return (
    <div className="min-h-screen mt-10 sm:p-4 lg:p-8">
      <div className="flex flex-col gap-2 items-center">
        <Skeleton className="bg-secondary h-[50px] lg:h-[75px] sm:w-1/2 lg:w-1/3" />
        <Skeleton className="bg-secondary h-[15px] lg:h-[20px] mb-4 md:mb-8 sm:w-1/2 lg:w-[200px]" />
      </div>
      <div className="grid sm:grid-cols-1 gap-4 md:grid-cols-4 justify-items-center">
        <div className="flex flex-col gap-4 items-center sm:mb-4">
          <Skeleton className="bg-secondary h-[350px] w-[200px]" />
        </div>
        <Skeleton className="bg-secondary col-span-3 h-full w-full" />
      </div>
    </div>
  );
}
