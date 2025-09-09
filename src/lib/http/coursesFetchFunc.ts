import { BackendRoutes } from "@/routes";
import appAxios from "../axiosClient";

export function getCoursesQueryFn({
  params,
}: {
  params?: Record<string, any>;
}) {
  return async ({ pageParam = 1 }): Promise<Paginated<Course>> => {
    const res = await appAxios.get<Paginated<Course>>(
      BackendRoutes.ALL_COURSES,
      {
        params: { ...params, page: pageParam },
      }
    );

    return res.data;
  };
}

export function getCourseDetailFn({ slug }: { slug: string }) {
  return async (): Promise<Course> => {
    const res = await appAxios.get<Course>(BackendRoutes.COURSE_DETAIL(slug));

    return res.data;
  };
}
export function getMinimalCourseContent({ slug }: { slug: string }) {
  return async (): Promise<CourseContentMin> => {
    const res = await appAxios.get<CourseContentMin>(
      BackendRoutes.COURSE_CONTENT_MINIMAL(slug)
    );

    return res.data;
  };
}
