import CenterOnLgScreen from "@/common/utils/CenterOnLgScreen";
import LoadingCourses from "@/common/utils/LoadingCourses";
import { FilterProvider } from "@/components/home/FilterProvider";
import HomeFilter from "@/components/home/HomeFilters";
import ListCourseWrapper from "@/components/home/ListCourseWrapper";
import Hero from "@/components/layout/Hero";
import { cacheKeys } from "@/lib/cacheKeys";
import { getQueryClient } from "@/lib/get-query-client";
import { getCoursesQueryFn } from "@/lib/http/coursesFetchFunc";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";

export const experimental_ppr = true;

export default async function Page() {
  // const t = await getTranslations();
  const queryClient = getQueryClient();

  queryClient.prefetchInfiniteQuery({
    queryKey: [cacheKeys.ALL_COURSES],
    queryFn: getCoursesQueryFn({}),
    initialPageParam: 1,
  });

  // "HOME_SORT": {
  //       "MOST_VIEWED": "Most Viewed",
  //       "TOP_RATED": "Top Reated",
  //       "RECENTLY_ADDED": "Recently Added"
  //   },

  return (
    <CenterOnLgScreen
      props={{ component: "main" }}
      className="min-h-[calc(100vh-370px)]"
    >
      <Hero />
      <section className="mt-8 lg:m-0">
        <FilterProvider>
          <HomeFilter />
          <HydrationBoundary state={dehydrate(queryClient)}>
            <Suspense fallback={<LoadingCourses />}>
              <ListCourseWrapper />
            </Suspense>
          </HydrationBoundary>
        </FilterProvider>
      </section>
    </CenterOnLgScreen>
  );
}
