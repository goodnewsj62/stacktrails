"use client";
import { Button } from "@mui/material";
import { useState } from "react";
import Module from "./detail-parts/Module";
import Section from "./detail-parts/Section";

type CourseSectionsProps = {};

const artificialSections = Array.from({ length: 30 }, (_, i) => ({
  title: `Section ${i + 1}`,
}));

const CourseSections: React.FC<CourseSectionsProps> = () => {
  const [showAll, setShowAll] = useState(false);
  const visibleSections = showAll
    ? artificialSections
    : artificialSections.slice(0, 10);
  const remaining = artificialSections.length - 10;

  return (
    <section className="">
      <h2 className="text-2xl capitalize font-bold text-gray-900 mb-6">
        course sections
      </h2>

      <div className="space-y-2">
        {visibleSections.map((section, i) => (
          <Section
            key={section.title}
            title={section.title}
            defaultExpanded={i === 0}
          >
            <Module showDescription />
          </Section>
        ))}
        {!showAll && artificialSections.length > 10 && (
          <Button
            fullWidth
            variant="outlined"
            onClick={() => setShowAll(true)}
            sx={{ mt: 2 }}
          >
            See all remaining {remaining}{" "}
            {remaining === 1 ? "section" : "sections"}
          </Button>
        )}
      </div>
    </section>
  );
};

export default CourseSections;
