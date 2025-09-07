import CenterOnLgScreen from "@/common/utils/CenterOnLgScreen";
import AuthorsBio from "@/components/course-details/AuthorsBio";
import CommentsReview from "@/components/course-details/CommentsReview";
import CourseAside from "@/components/course-details/CourseAside";
import CourseDetailHeader from "@/components/course-details/CourseDetailHeader";
import CourseInfo from "@/components/course-details/CourseInfo";
import CourseSections from "@/components/course-details/CourseSections";
import FullDescription from "@/components/course-details/FullDescription";
import { PropsWithChildren } from "react";

type props = {
  params: Promise<{ slug_id: string }>;
};

export const experimental_ppr = true;

export default async function Page({ params }: props) {
  //   const { slug_id } = await params;
  //   const t = await getTranslations("COURSE_DETAIL");

  return (
    <main className="">
      <section className={"w-full  bg-[#04111F] text-[#fffdfd]"}>
        <CenterOnLgScreen props={{ component: "div" }} className="">
          <ContentContainer>
            <CourseDetailHeader />
          </ContentContainer>
          <CourseAside />
        </CenterOnLgScreen>
      </section>
      <CenterOnLgScreen
        props={{ component: "section" }}
        className="min-h-[calc(100vh-370px)]"
      >
        <ContentContainer>
          <div className="w-full flex flex-col gap-10 py-16 xl:pr-8">
            <CourseInfo />

            <CourseSections />

            <FullDescription />

            <AuthorsBio />

            <CommentsReview />
          </div>
        </ContentContainer>
      </CenterOnLgScreen>
    </main>
  );
}

function ContentContainer({ children }: PropsWithChildren) {
  return (
    <div className="flex justify-center ">
      <div className={`w-full  max-w-[80ch]`}>{children}</div>
      <div
        aria-hidden
        className="hidden xl:block xl:invisible xl:w-[400px]"
      ></div>
    </div>
  );
}
