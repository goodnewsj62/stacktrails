"use client";

import CourseCard from "@/common/cards/CourseCard";
import PageHeaderText from "@/common/cards/PageHeader";
import CenterOnLgScreen from "@/common/utils/CenterOnLgScreen";
import LoadingComponent from "@/common/utils/LoadingComponent";
import appAxios from "@/lib/axiosClient";
import { cacheKeys } from "@/lib/cacheKeys";
import { BackendRoutes } from "@/routes";
import { useAppStore } from "@/store";
import { useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";

export default function Page() {
  const t = useTranslations();
  const { user } = useAppStore((state) => state);
  const { data, status, isLoading } = useQuery({
    queryKey: [cacheKeys.ENROLLED_COURSE, user?.id],
    queryFn: async (): Promise<Paginated<EnrolledCourse>> => {
      const data = await appAxios.get(BackendRoutes.ENROLLED_COURSES);
      return data.data;
    },
  });

  return (
    <LoadingComponent
      loading={isLoading}
      error={status === "error"}
      data={(data?.items ?? []) as EnrolledCourse[]}
    >
      {(validData) => (
        <CenterOnLgScreen className="!py-8 space-y-10">
          <PageHeaderText
            headerText={t("NAVS.ENROLLED")}
            shortText={t("ENROLLED_TEXT")}
          />

          <div className="w-full grid gap-6 [grid-template-columns:repeat(auto-fill,minmax(300px,1fr))]">
            {validData.map((v) => (
              <CourseCard
                key={v.course.id}
                enrollment={v.enrollment}
                type="enrolled"
                course={v.course}
              />
            ))}
          </div>
        </CenterOnLgScreen>
      )}
    </LoadingComponent>
  );
}
