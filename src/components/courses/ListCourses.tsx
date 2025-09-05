import CourseCard from "@/common/cards/CourseCard";
import appAxios from "@/lib/axiosClient";
import { cacheKeys } from "@/lib/cacheKeys";
import { BackendRoutes } from "@/routes";
import { Button } from "@mui/material";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

type Props = {
  params?: Record<string, any>;
};

const ListCourse: React.FC<Props> = ({ params }) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useSuspenseInfiniteQuery({
      queryKey: [cacheKeys.ALL_COURSES, params],
      queryFn: async ({
        pageParam = 1,
      }): Promise<AxiosResponse<Paginated<Course>>> => {
        return await appAxios.get(BackendRoutes.ALL_COURSES, {
          params: {
            ...params,
            page: pageParam,
          },
        });
      },
      getNextPageParam: (lastPage) => {
        return lastPage.data.has_next ? lastPage.data.page + 1 : undefined;
      },
      initialPageParam: 1,
    });

  return (
    <div className="space-y-4">
      {data.pages.map((page, i) => (
        <div key={i} className="grid gap-4">
          {page.data.items.map((course: Course) => (
            <CourseCard
              key={course.id}
              imageSrc={course.image || "/placeholder.png"}
              title={course.title}
            />
          ))}
        </div>
      ))}

      {hasNextPage && (
        <div className="flex justify-center pt-4">
          <Button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            variant="outlined"
          >
            {isFetchingNextPage ? "Loading..." : "Load More"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default ListCourse;
