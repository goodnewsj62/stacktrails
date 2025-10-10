"use client";

import { Tab, Tabs } from "@mui/material";
import { useTranslations } from "next-intl";
import { useEffect, useMemo, useState } from "react";
import CourseChat from "../chats/CourseChat";
import CourseNav from "./layout/CourseNav";
import Comments from "./study-tabs/Comments";
import Review from "./study-tabs/Review";
import Summary from "./study-tabs/Summary";

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

type StudyTabsProps = {
  sections: FullSection[];
  progress?: CourseProgress;
  currentModule: FullModule;
  setCurrentModuleId: (id: string) => void;
  course: FullCourse;
  showContent?: boolean;
  showChats?: boolean;
};
const StudyTabs: React.FC<StudyTabsProps> = ({
  sections,
  currentModule,
  setCurrentModuleId,
  progress,
  course,
  showContent,
  showChats,
}) => {
  const t = useTranslations();
  const [value, setValue] = useState("SUMMARY");

  useEffect(() => {
    if (showChats || showContent)
      setValue(showChats ? "CHATS" : "COURSE_ITEMS");
    else if (value === "COURSE_ITEMS" || value === "CHATS") setValue("SUMMARY");
  }, [showContent, showChats]);

  const NAV = useMemo(() => {
    const navItems: { key: string; title: string }[] = [
      { key: "SUMMARY", title: t("SUMMARY") },
      { key: "COMMENTS", title: t("COMMENTS") },
      { key: "REVIEWS", title: t("REVIEWS") },
    ];

    if (showContent) {
      navItems.unshift({ key: "COURSE_ITEMS", title: t("COURSE_ITEMS") });
    }

    if (showChats) {
      navItems.unshift({ key: "CHATS", title: t("CHATS") });
    }

    return navItems;
  }, [showContent, showChats]);

  const handleChange = (_: React.SyntheticEvent, newValue: any) => {
    setValue(newValue);
  };

  return (
    <div className="px-8 py-4">
      <Tabs value={value} onChange={handleChange}>
        {NAV.map(({ key, title }, index) => (
          <Tab
            label={title}
            key={key}
            value={key}
            sx={{ textTransform: "capitalize" }}
            {...a11yProps(index)}
          />
        ))}
      </Tabs>

      <div className="px-4">
        <div hidden={value !== "REVIEWS"} className="py-8">
          <Review courseId={course.id} />
        </div>
        <div hidden={value !== "COMMENTS"} className="py-8">
          <Comments courseId={course.id} />
        </div>
        <div hidden={value !== "CHATS"} className="">
          <CourseChat courseId={course.id} />
        </div>
        <div hidden={value !== "COURSE_ITEMS"} className="py-8">
          <CourseNav
            currentModule={currentModule}
            sections={sections}
            setCurrentModuleId={setCurrentModuleId}
            progress={progress}
          />
        </div>
        <div hidden={value !== "SUMMARY"} className="py-8">
          <Summary course={course} />
        </div>
      </div>
    </div>
  );
};

export default StudyTabs;
