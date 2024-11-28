import { Skeleton } from "@/components/ui/skeleton"

export default function TravelFormSkeleton() {
  return (
    <div className="flex flex-wrap gap-4 items-center">
    {/* Loading From Field */}
    <div className="flex-1 min-w-[200px]">
      <Skeleton className="h-4 w-24 mb-2" />
      <Skeleton className="h-10 w-full rounded-md" />
    </div>

    {/* Going To Field */}
    <div className="flex-1 min-w-[200px]">
      <Skeleton className="h-4 w-24 mb-2" />
      <Skeleton className="h-10 w-full rounded-md" />
    </div>

    {/* Date of Departure Field */}
    <div className="flex-1 min-w-[200px]">
      <Skeleton className="h-4 w-32 mb-2" />
      <Skeleton className="h-10 w-full rounded-md" />
    </div>

    {/* Return Date Field */}
    <div className="flex-1 min-w-[200px]">
      <Skeleton className="h-4 w-32 mb-2" />
      <Skeleton className="h-10 w-full rounded-md" />
    </div>

    {/* Single Lady Checkbox */}
    <div className="flex items-center space-x-2">
      <Skeleton className="h-5 w-5 rounded" />
      <Skeleton className="h-4 w-20" />
    </div>

    {/* Submit Button */}
    <div className="min-w-[100px]">
      <Skeleton className="h-10 w-full bg-red-500/20 rounded-md" />
    </div>
  </div>
  )
}