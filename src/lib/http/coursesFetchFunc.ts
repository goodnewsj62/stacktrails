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

export function hasEnrolled({ courseId }: { courseId: string }) {
  return async (): Promise<EnrollmentResp> => {
    const res = await appAxios.get<EnrollmentResp>(
      BackendRoutes.GET_COURSE_ENROLLMENT(courseId)
    );

    return res.data;
  };
}

export async function freeEnrollment({
  course_id,
  account_id,
}: {
  course_id: string;
  account_id: string;
}): Promise<EnrollmentResp> {
  const res = await appAxios.post<any>(BackendRoutes.ENROLL, {
    course_id,
    account_id,
  });

  return res.data;
}
