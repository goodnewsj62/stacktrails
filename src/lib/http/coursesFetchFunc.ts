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
