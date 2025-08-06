import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function CardSkeleton() {
  return (
    <Card className="border-0 shadow-md hover:shadow-lg transition-shadow duration-200">
      <CardContent className="p-0">
        <div className="h-48 bg-gradient-to-br from-blue-100 to-blue-200 rounded-t-lg relative overflow-hidden">
          {/* Shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-pulse"></div>
        </div>
        <div className="p-6">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <Skeleton className="h-5 w-32 mb-2 bg-blue-100" />
              <Skeleton className="h-4 w-24 bg-blue-100" />
            </div>
            <Skeleton className="h-6 w-16 bg-blue-100" />
          </div>

          <div className="flex items-center gap-2 mb-3">
            <Skeleton className="h-4 w-12 bg-blue-100" />
            <Skeleton className="h-4 w-8 bg-blue-100" />
          </div>

          <div className="flex gap-1 mb-4">
            <Skeleton className="h-6 w-16 rounded-full bg-blue-100" />
            <Skeleton className="h-6 w-20 rounded-full bg-blue-100" />
            <Skeleton className="h-6 w-8 rounded-full bg-blue-100" />
          </div>

          <div className="flex items-center justify-between">
            <Skeleton className="h-6 w-20 bg-blue-100" />
            <Skeleton className="h-9 w-24 rounded-md bg-blue-100" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function ProfileSkeleton() {
  return (
    <Card className="shadow-sm">
      <CardContent className="p-6">
        <div className="animate-pulse">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Profile Image */}
            <div className="flex-shrink-0">
              <Skeleton className="w-24 h-24 rounded-full bg-blue-100" />
            </div>

            {/* Profile Info */}
            <div className="flex-grow">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div className="flex-grow">
                  <Skeleton className="h-8 w-48 mb-3 bg-blue-100" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-32 bg-blue-100" />
                    <Skeleton className="h-4 w-28 bg-blue-100" />
                  </div>
                </div>
                <Skeleton className="h-10 w-32 rounded-md bg-blue-100" />
              </div>

              <div className="mt-4 space-y-2">
                <Skeleton className="h-4 w-full bg-blue-100" />
                <Skeleton className="h-4 w-3/4 bg-blue-100" />
              </div>

              <div className="flex flex-wrap gap-4 mt-4">
                <Skeleton className="h-4 w-24 bg-blue-100" />
                <Skeleton className="h-4 w-28 bg-blue-100" />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function ListSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
}

export function FeaturedSectionSkeleton() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Instructors Section */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <Skeleton className="h-8 w-32 mb-2" />
              <Skeleton className="h-5 w-80" />
            </div>
            <Skeleton className="h-10 w-32" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        </div>

        {/* Resorts Section */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <div>
              <Skeleton className="h-8 w-32 mb-2" />
              <Skeleton className="h-5 w-80" />
            </div>
            <Skeleton className="h-10 w-32" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
