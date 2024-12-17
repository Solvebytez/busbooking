import { Skeleton } from "@/components/ui/skeleton"

function BusDetailsSkeleton() {
  return (
    <div className="w-full shadow-md bg-white rounded mx-auto p-4 space-y-4 border-b last:border-b-0">
      {/* Header Section */}
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-96" />
        </div>
        <Skeleton className="h-6 w-20" />
      </div>

      {/* Journey Details Section */}
      <div className="grid grid-cols-3 gap-4 py-4">
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-6 w-48" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-6 w-32" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-6 w-48" />
        </div>
      </div>

      {/* Navigation Bar */}
      <div className="flex justify-between items-center pt-4">
        <div className="flex space-x-4">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-8 w-24" />
          <Skeleton className="h-8 w-24" />
          <Skeleton className="h-8 w-28" />
        </div>
        <Skeleton className="h-10 w-28" />
      </div>
    </div>
  )
}

export default function BusSkeletonList() {
  return (
    <div className="space-y-8">
      {[...Array(5)].map((_, index) => (
        <BusDetailsSkeleton key={index} />
      ))}
    </div>
  )
}
