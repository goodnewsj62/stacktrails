"use client";

import CourseCard from "@/common/cards/CourseCard";
import PageHeaderText from "@/common/cards/PageHeader";
import StatCard from "@/common/cards/StatCard";
import CenterOnLgScreen from "@/common/utils/CenterOnLgScreen";
import LoadingComponent from "@/common/utils/LoadingComponent";
import appAxios from "@/lib/axiosClient";
import { cacheKeys } from "@/lib/cacheKeys";
import { getNumberUnit } from "@/lib/utils";
import { BackendRoutes } from "@/routes";
import { useAppStore } from "@/store";
import { useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { AiFillLike } from "react-icons/ai";
import { FaCheckCircle } from "react-icons/fa";
import { IoMdChatbubbles } from "react-icons/io";
import { RiFolderSharedFill } from "react-icons/ri";

export default function Page() {
  const t = useTranslations();
  const { user } = useAppStore((state) => state);

  const {
    data: statData,
    status: statStatus,
    isLoading: isLoadingStat,
  } = useQuery({
    queryKey: [cacheKeys.CREATOR_STAT, user?.id],
    queryFn: async (): Promise<CreatorStat> => {
      const data = await appAxios.get(BackendRoutes.CREATORS_STATS);
      return data.data;
    },
  });

  const { data, status, isLoading } = useQuery({
    queryKey: [cacheKeys.CREATED_COURSE, user?.id],
    queryFn: async (): Promise<Paginated<FullCourse>> => {
      const data = await appAxios.get(BackendRoutes.CREATED_COURSE);
      return data.data;
    },
  });

  return (
    <LoadingComponent
      loading={isLoading || isLoadingStat}
      error={status === "error" || statStatus === "error"}
      data={{
        data: (data?.items ?? []) as FullCourse[],
        stat: statData as CreatorStat,
      }}
    >
      {({ data, stat }) => (
        <CenterOnLgScreen className="!py-8 space-y-10">
          <PageHeaderText
            headerText={t("NAVS.CREATED")}
            shortText={t("ENROLLED_TEXT")}
          />

          <div className="flex flex-col gap-6 lg:flex-row">
            <StatCard
              title={t("CREATED_COURSE.PUBLISHED")}
              value={getNumberUnit(stat.total_published)}
              icon={<RiFolderSharedFill />}
            />
            <StatCard
              title={t("CREATED_COURSE.ENROLLED_STUDENT")}
              value={getNumberUnit(stat.total_enrolled)}
              icon={<FaCheckCircle />}
            />
            <StatCard
              title={t("CREATED_COURSE.TOTAL_REVIEWS")}
              value={getNumberUnit(stat.total_reviews)}
              icon={<AiFillLike />}
            />
            <StatCard
              title={t("CREATED_COURSE.TOTAL_COMMENTS")}
              value={getNumberUnit(stat.total_comments)}
              icon={<IoMdChatbubbles />}
            />
          </div>

          <div className="w-full grid gap-6 [grid-template-columns:repeat(auto-fill,minmax(300px,1fr))]">
            {data.map((v) => (
              <CourseCard key={v.id} type="created" course={v} />
            ))}
          </div>
        </CenterOnLgScreen>
      )}
    </LoadingComponent>
  );
}
