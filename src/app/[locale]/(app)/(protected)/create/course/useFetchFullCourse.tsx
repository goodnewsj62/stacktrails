import { useRouter } from "@/hooks/useBlockNavigation";
import { cacheKeys } from "@/lib/cacheKeys";
import { getFullCourseContent } from "@/lib/http/coursesFetchFunc";
import { AppRoutes } from "@/routes";
import { useAppStore } from "@/store";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export default function useFullCourseQuery(slug?: string) {
  const { user } = useAppStore((state) => state);
  const router = useRouter();

  const query = useQuery({
    queryKey: [cacheKeys.COURSE_DETAIL, slug, user?.id],
    queryFn: getFullCourseContent({ slug: slug as any }),
    enabled: !!user?.id && !!slug,
  });

  const { data, status } = query;
  useEffect(() => {
    if (data && user && data?.account_id !== user?.id)
      router.push(AppRoutes.DASHBOARD);
  }, [data, user]);

  const isLoading = status === "pending" || data?.account_id !== user?.id;
  return {
    ...query,
    isLoading,
    queryKey: [cacheKeys.COURSE_DETAIL, slug, user?.id],
  };
}
