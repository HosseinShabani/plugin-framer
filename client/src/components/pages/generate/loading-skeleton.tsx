import { Skeleton } from "@/components/ui/skeleton";

const LoadingSkeleton = () => {
  return (
    <>
      <div className="grid gap-0.5">
        <div className="flex items-center gap-0.5">
          <Skeleton className="h-8 w-24" />
          <Skeleton className="size-14 rounded-full" />
          <Skeleton className="h-8 w-32" />
        </div>
        <Skeleton className="h-8 w-28" />
      </div>

      <Skeleton className="mt-7 h-28 w-full rounded-md" />

      <div className="mt-6 mb-10 flex flex-col gap-4">
        {Array.from({ length: 2 }).map((_, index) => (
          <div key={index} className="grid gap-2">
            <Skeleton className="h-3.5 w-20 rounded-xs" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-3.5 w-full rounded-xs" />
          </div>
        ))}
      </div>

      <Skeleton className="h-12 w-full rounded-full" />
    </>
  );
};
export default LoadingSkeleton;
