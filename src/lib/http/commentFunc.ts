import { BackendRoutes } from "@/routes";
import appAxios from "../axiosClient";

export function getCourseComments({
  params,
  courseId,
}: {
  courseId: string;
  params?: Record<string, any>;
}) {
  return async ({ pageParam = 1 }): Promise<Paginated<CourseComment>> => {
    const res = await appAxios.get<Paginated<CourseComment>>(
      BackendRoutes.COURSE_COMMENTS(courseId),
      {
        params: { ...params, page: pageParam },
      }
    );

    return res.data;
  };
}

export function getCourseReviews({
  courseId,
  params,
}: {
  courseId: string;
  params?: Record<string, any>;
}) {
  return async ({ pageParam = 1 }): Promise<Paginated<CourseReview>> => {
    const res = await appAxios.get<Paginated<CourseReview>>(
      BackendRoutes.COURSE_REVIEW(courseId),
      {
        params: { ...params, page: pageParam },
      }
    );

    return res.data;
  };
}

export function CreateComment() {}

export function UpdateComment() {}
