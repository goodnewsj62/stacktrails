"use client";

import ErrorDisplay from "@/common/utils/Error";
import LoadingComponent from "@/common/utils/LoadingComponent";
import ClientFooter from "@/components/layout/ClientFooter";
import { AppRoutes } from "@/routes";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { use, useEffect } from "react";
import useFullCourseQuery from "../../../create/course/useFetchFullCourse";
import useFetchCourseProgress from "./useFetchCourseProgress";

export default function Page({
  params,
}: {
  params: Promise<{ slug_id: string }>;
}) {
  const { slug_id } = use(params);
  const router = useRouter();
  const { data, status } = useFullCourseQuery(slug_id, "student");
  const t = useTranslations();

  const { data: progressData, status: progressStatus } = useFetchCourseProgress(
    data?.data?.id
  );

  useEffect(() => {
    if (status === "success" && progressStatus !== "pending") {
      if (progressData?.next_module) {
        router.push(
          AppRoutes.getEnrolledCourseModuleRoute(
            slug_id,
            progressData.next_module
          )
        );
      } else {
        router.push(
          AppRoutes.getEnrolledCourseModuleRoute(
            slug_id,
            data.data.sections[0].modules[0].id
          )
        );
      }
    }
  }, [status, progressStatus, slug_id, data, progressData]);

  return (
    <>
      <LoadingComponent
        loading
        error={status === "error"}
        emptyComponent={
          data?.status === 403 ? (
            <ErrorDisplay
              title={t("PERMISSION_REQUIRED")}
              message={t("PERMISSION_MESSAGE")}
            />
          ) : data?.status === 404 ? (
            <ErrorDisplay
              title={t("NOT_FOUND")}
              message={t("NOT_FOUND_TEXT")}
            />
          ) : (
            <ErrorDisplay />
          )
        }
      />
      <ClientFooter />
    </>
  );
}
