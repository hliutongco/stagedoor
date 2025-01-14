import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className="min-h-screen mt-10 sm:p-4 lg:p-8">
      <div className="flex flex-col gap-4 items-center">
        <Skeleton className="bg-secondary h-[75px] sm:w-1/2 lg:w-1/3" />
        <Skeleton className="bg-secondary h-[15px] my-5 sm:w-1/2 lg:w-[200px]" />
      </div>
      <div className="grid sm:grid-cols-1 gap-4 md:grid-cols-2 justify-items-center">
        <div className="flex flex-col gap-4 items-center sm:mb-4">
          <Skeleton className="bg-secondary h-[394px] w-[250px]" />
        </div>
        <Skeleton className="bg-secondary h-full w-1/2" />
      </div>
    </div>
  );
}
