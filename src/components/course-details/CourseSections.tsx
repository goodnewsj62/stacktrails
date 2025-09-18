"use client";
import { cacheKeys } from "@/lib/cacheKeys";
import { getMinimalCourseContent } from "@/lib/http/coursesFetchFunc";
import { Button } from "@mui/material";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { useState } from "react";
import Module from "./detail-parts/Module";
import Section from "./detail-parts/Section";

type CourseSectionsProps = {};

const CourseSections: React.FC<CourseSectionsProps> = () => {
  const t = useTranslations();
  const { slug_id: slug } = useParams<{ slug_id: string }>();

  const { data } = useSuspenseQuery({
    queryKey: [cacheKeys.COURSE_CONTENT_MINIMAL, slug],
    queryFn: getMinimalCourseContent({ slug }),
  });

  const [showAll, setShowAll] = useState(false);
  const visibleSections = showAll ? data.sections : data.sections.slice(0, 10);
  const remaining = data.sections.length - 10;

  return (
    <section className="">
      <h2 className="text-2xl capitalize font-bold text-gray-900 mb-6">
        {t("COURSE_DETAIL.COURSE_SECTIONS")}
      </h2>

      <div className="space-y-2">
        {visibleSections.map((section, i) => (
          <Section
            key={section.id}
            title={section.title}
            defaultExpanded={i === 0}
          >
            <div className="grid gap-2">
              {section.modules.map((data) => (
                <Module key={data.id} data={data} showDescription />
              ))}
            </div>
          </Section>
        ))}
        {!showAll && data.sections.length > 10 && (
          <Button
            fullWidth
            variant="outlined"
            onClick={() => setShowAll(true)}
            sx={{ mt: 2 }}
          >
            {t("COURSE_DETAIL.SEE_ALL_REMAINING")} {remaining}{" "}
            {remaining === 1 ? "section" : "sections"}
          </Button>
        )}
      </div>
    </section>
  );
};

export default CourseSections;
