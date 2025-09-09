import CenterOnLgScreen from "@/common/utils/CenterOnLgScreen";
import AuthorsBio from "@/components/course-details/AuthorsBio";
import CommentsReview from "@/components/course-details/CommentsReview";
import CourseAside from "@/components/course-details/CourseAside";
import CourseDetailHeader from "@/components/course-details/CourseDetailHeader";
import CourseInfo from "@/components/course-details/CourseInfo";
import CourseSections from "@/components/course-details/CourseSections";
import FullDescription from "@/components/course-details/FullDescription";
import { appFetch } from "@/lib/appFetch";
import { cacheKeys } from "@/lib/cacheKeys";
import { getQueryClient } from "@/lib/get-query-client";
import { getCourseComments, getCourseReviews } from "@/lib/http/commentFunc";
import {
  getCourseDetailFn,
  getMinimalCourseContent,
} from "@/lib/http/coursesFetchFunc";
import { BackendRoutes } from "@/routes";
import { Skeleton } from "@mui/material";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { notFound } from "next/navigation";
import { PropsWithChildren, Suspense } from "react";

type props = {
  params: Promise<{ slug_id: string }>;
};

export const experimental_ppr = true;

export default async function Page({ params }: props) {
  const { slug_id: slug } = await params;
  // const t = await getTranslations("COURSE_DETAIL");

  const queryClient = getQueryClient();

  const { id: courseId } = await queryClient.fetchQuery({
    queryKey: [cacheKeys.COURSE_DETAIL, slug],
    queryFn: getCourseDetailFn({ slug }),
  });

  queryClient.prefetchQuery({
    queryKey: [cacheKeys.COURSE_CONTENT_MINIMAL, slug],
    queryFn: getMinimalCourseContent({ slug }),
  });

  queryClient.prefetchInfiniteQuery({
    queryKey: [cacheKeys.COURSE_COMMENT, courseId],
    queryFn: getCourseComments({ courseId }),
    initialPageParam: 1,
  });

  queryClient.prefetchInfiniteQuery({
    queryKey: [cacheKeys.COURSE_REVIEW, courseId],
    queryFn: getCourseReviews({ courseId }),
    initialPageParam: 1,
  });

  const resp = await appFetch<Course>(BackendRoutes.COURSE_DETAIL(slug));
  const data = resp.ok ? resp.data : null;

  if (!data) {
    notFound();
  }

  return (
    <main className="">
      <section className={"w-full   bg-[#04111F] text-[#fffdfd]"}>
        <CenterOnLgScreen props={{ component: "div" }} className="">
          <ContentContainer>
            <CourseDetailHeader data={data} />
          </ContentContainer>

          <HydrationBoundary state={dehydrate(queryClient)}>
            <Suspense
              fallback={
                <div className="w-full  max-w-[400px]  rounded-2xl shadow">
                  <Skeleton className="w-full h-80" />
                </div>
              }
            >
              <CourseAside />
            </Suspense>
          </HydrationBoundary>
        </CenterOnLgScreen>
      </section>
      <CenterOnLgScreen
        props={{ component: "section" }}
        className="min-h-[calc(100vh-370px)]"
      >
        <ContentContainer>
          <div className="w-full flex flex-col gap-10 py-16 xl:pr-8">
            <CourseInfo data={data} />

            <HydrationBoundary state={dehydrate(queryClient)}>
              <Suspense
                fallback={
                  <div className="w-full flex flex-col gap-4">
                    {Array.from({ length: 10 }, (_, i) => (
                      <Skeleton
                        key={`section-sus${i}`}
                        className="w-full h-8"
                      />
                    ))}
                  </div>
                }
              >
                <CourseSections />
              </Suspense>
            </HydrationBoundary>

            <FullDescription data={data} />

            <AuthorsBio data={data} />

            <HydrationBoundary state={dehydrate(queryClient)}>
              <Suspense
                fallback={
                  <div className="w-full flex flex-col gap-4">
                    {Array.from({ length: 10 }, (_, i) => (
                      <Skeleton
                        key={`section-comment${i}`}
                        className="w-full h-8"
                      />
                    ))}
                  </div>
                }
              >
                <CommentsReview courseId={courseId} />
              </Suspense>
            </HydrationBoundary>
          </div>
        </ContentContainer>
      </CenterOnLgScreen>
    </main>
  );
}

function ContentContainer({ children }: PropsWithChildren) {
  return (
    <div className="flex justify-center ">
      <div className={`w-full max-w-[80ch]`}>{children}</div>
      <div
        aria-hidden
        className="hidden xl:block xl:invisible xl:w-[400px]"
      ></div>
    </div>
  );
}
