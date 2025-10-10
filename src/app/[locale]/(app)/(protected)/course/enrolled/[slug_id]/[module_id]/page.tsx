"use client";

import ErrorDisplay from "@/common/utils/Error";
import LoadingComponent from "@/common/utils/LoadingComponent";
import ClientFooter from "@/components/layout/ClientFooter";
import ContentArea from "@/components/study-area/ContentArea";
import CourseStructureNav from "@/components/study-area/layout/CourseStructureNav";
import StudyHeader from "@/components/study-area/layout/StudyHeader";
import { useWindowWidth } from "@/hooks/useWindowWidth";
import appAxios from "@/lib/axiosClient";
import { cacheKeys } from "@/lib/cacheKeys";
import { BackendRoutes } from "@/routes";
import { useAppStore } from "@/store";
import { useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { use, useState } from "react";
import { FaExpandAlt } from "react-icons/fa";
import useFullCourseQuery from "../../../../create/course/useFetchFullCourse";
import useFetchCourseEnrolment from "../useFetchCourseEnrolment";
import useFetchCourseProgress from "../useFetchCourseProgress";

export default function Page({
  params,
}: {
  params: Promise<{ slug_id: string; module_id: string }>;
}) {
  const { slug_id, module_id } = use(params);
  // const firstModuleIdRef = useRef<string>(null);
  const [moduleId, setModuleId] = useState<string>(module_id);
  const [navCollapsed, setNavCollapsed] = useState(false);
  const windowsWidth = useWindowWidth({});
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { user } = useAppStore((state) => state);
  const t = useTranslations();
  const { data, status } = useFullCourseQuery(slug_id, "student");

  const { data: progressData, status: progressStatus } = useFetchCourseProgress(
    data?.data?.id
  );
  const { data: enrollmentData, status: enrollmentStatus } =
    useFetchCourseEnrolment(data?.data?.id);

  const { status: moduleStatus, data: moduleData } = useQuery({
    queryKey: [cacheKeys.MODULE_DETAIL_PAGE, moduleId, user?.id],
    queryFn: async (): Promise<FullModule> => {
      const res = await appAxios.get<any>(
        BackendRoutes.GET_FULL_MODULE(moduleId)
      );

      return res.data;
    },
  });

  const handleModuleSelect = (id: string) => {
    setModuleId(id);
    if (pathname) {
      const newPath = pathname.replace(/[^/]+$/, id);
      const queryString = searchParams?.toString() ?? "";
      const hash = typeof window !== "undefined" ? window.location.hash : "";
      const url = queryString
        ? `${newPath}?${queryString}${hash}`
        : `${newPath}${hash}`;
      router.replace(url, { scroll: false });
    }
  };

  const courseError =
    data?.status === 403 ? (
      <ErrorDisplay
        title={t("PERMISSION_REQUIRED")}
        message={t("PERMISSION_MESSAGE")}
      />
    ) : data?.status === 404 ? (
      <ErrorDisplay title={t("NOT_FOUND")} message={t("NOT_FOUND_TEXT")} />
    ) : (
      <ErrorDisplay />
    );

  const marginStyle = {
    marginRight:
      windowsWidth >= 1024 && !navCollapsed
        ? windowsWidth >= 1280
          ? "400px"
          : "300px"
        : "0px",
  };

  return (
    <div>
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f7fafc;
          border-radius: 0px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e0;
          border-radius: 0px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #a0aec0;
        }
      `}</style>
      <LoadingComponent
        loading={
          status === "pending" ||
          enrollmentStatus === "pending" ||
          moduleStatus === "pending"
        }
        error={
          status === "error" ||
          enrollmentStatus === "error" ||
          moduleStatus === "error"
        }
        errorComponent={courseError}
        data={{
          course: data?.data as FullCourse,
          enrollment: enrollmentData as CourseEnrollment,
          progress: progressData as CourseProgress,
          module: moduleData as FullModule,
          moduleStatus,
        }}
      >
        {({ module, course, enrollment, progress, moduleStatus }) => (
          <>
            <StudyHeader
              course={course}
              enrollment={enrollment}
              progress={progress}
            />
            <main
              className={""}
              style={{
                ...marginStyle,
              }}
            >
              <section className="relative">
                <ContentArea
                  module={module}
                  isLoading={moduleStatus === "pending"}
                />
              </section>

              <button
                type="button"
                className={`hidden z-[200] cursor-pointer fixed px-6 py-4 bg-primary text-white  top-[30%] right-0 ${
                  windowsWidth >= 1024 && navCollapsed ? "!block" : ""
                }`}
                onClick={() => setNavCollapsed(false)}
              >
                <FaExpandAlt size={20} />
              </button>
              <section
                className={`hidden bg-white z-[300] top-[58px] right-0 h-[calc(100vh-58px)] overflow-y-auto  lg:!block lg:w-[300px] xl:w-[400px] lg:fixed custom-scrollbar ${
                  navCollapsed && "!-right-[400px]"
                }`}
                style={{
                  scrollbarWidth: "thin",
                  scrollbarColor: "#cbd5e0 #f7fafc",
                }}
              >
                <CourseStructureNav
                  sections={course.sections}
                  currentModule={module}
                  setCurrentModuleId={handleModuleSelect}
                  onClose={() => setNavCollapsed(!navCollapsed)}
                  progress={progress}
                />
              </section>
            </main>
          </>
        )}
      </LoadingComponent>
      <ClientFooter
        style={{
          ...marginStyle,
        }}
      />
    </div>
  );
}
