import { Skeleton } from "@mui/material";

const LoadingCourses = () => {
  return (
    <div className="space-y-4">
      <div className="w-full grid gap-6 [grid-template-columns:repeat(auto-fill,minmax(260px,1fr))]">
        {Array.from({ length: 10 }).map((_, index) => (
          <div key={`skeleton-${index}`} className="space-y-3">
            {/* Course image skeleton */}
            <Skeleton
              variant="rectangular"
              height={160}
              className="rounded-lg"
            />

            {/* Course title skeleton */}
            <Skeleton variant="text" height={24} width="80%" />

            {/* Course description skeleton */}
            <Skeleton variant="text" height={20} width="100%" />
            <Skeleton variant="text" height={20} width="60%" />

            {/* Course metadata skeleton */}
            <div className="flex justify-between items-center">
              <Skeleton variant="text" height={16} width={80} />
              <Skeleton variant="text" height={16} width={60} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoadingCourses;
