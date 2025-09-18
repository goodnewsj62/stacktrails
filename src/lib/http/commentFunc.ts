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

export function getCommentReplies({
  params,
  commentId,
}: {
  commentId: string;
  params?: Record<string, any>;
}) {
  return async ({ pageParam = 1 }): Promise<Paginated<CourseComment>> => {
    const res = await appAxios.get<Paginated<CourseComment>>(
      BackendRoutes.COMMENT_REPLIES(commentId),
      {
        params: { ...params, page: pageParam },
      }
    );

    return res.data;
  };
}

export async function createCommentFn({
  message,
  course_id,
  reply_to_id,
}: {
  message: string;
  course_id: string;
  reply_to_id?: string;
}): Promise<CourseComment> {
  const res = await appAxios.post<CourseComment>(BackendRoutes.CREATE_COMMENT, {
    message,
    course_id,
    reply_to_id: reply_to_id || null,
  });

  return res.data;
}
export async function likeUnlike({
  comment_id,
}: {
  comment_id: string;
}): Promise<CourseComment> {
  const res = await appAxios.patch<any>(BackendRoutes.LIKE_COMMENT(comment_id));

  return res.data;
}

export async function createReviewFn({
  message,
  course_id,
  star,
}: {
  message: string;
  course_id: string;
  star: number;
}): Promise<CourseReview> {
  const res = await appAxios.post<CourseReview>(BackendRoutes.CREATE_RATING, {
    message,
    course_id,
    star,
  });

  return res.data;
}

export function UpdateComment() {}
