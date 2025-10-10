"use client";

import CourseChat from "@/components/chats/CourseChat";
import { Tab, Tabs } from "@mui/material";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { IoClose, IoExpand } from "react-icons/io5";
import NavModule from "./NavModule";
import NavSection from "./NavSection";

type CourseStructureNavProps = {
  sections: FullSection[];
  progress?: CourseProgress;
  currentModule: FullModule;
  setCurrentModuleId: (id: string) => void;
  onClose: () => void;
};

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const CourseStructureNav: React.FC<CourseStructureNavProps> = ({
  sections,
  currentModule,
  setCurrentModuleId,
  progress,
  onClose,
}) => {
  const t = useTranslations();
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className="relative">
      <div className="sticky flex items-center gap-4  top-0 left-0 h-12 w-full bg-white py-2 px-4 z-10">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab
            label={t("COURSE_ITEMS")}
            sx={{ textTransform: "capitalize" }}
            {...a11yProps(0)}
          />
          <Tab
            label={t("CHATS")}
            sx={{ textTransform: "capitalize" }}
            {...a11yProps(1)}
          />
        </Tabs>

        <button type="button" className="ml-auto cursor-pointer">
          <IoExpand size={18} />
        </button>
        <button className=" cursor-pointer" type="button" onClick={onClose}>
          <IoClose size={20} />
        </button>
      </div>
      <div hidden={value === 0}>
        <CourseChat course_id={""} />
      </div>
      <div hidden={value === 1}>
        {sections.map((section) => (
          <NavSection
            key={section.id}
            title={section.title}
            defaultExpanded={section.id === currentModule.section_id}
          >
            <div className="grid ">
              {section.modules.map((data) => (
                <NavModule
                  key={data.id}
                  data={data as FullModule}
                  selected={currentModule.id === data.id}
                  onClick={() => {
                    if (currentModule.id !== data.id) {
                      setCurrentModuleId(data.id);
                    }
                  }}
                  completed={(
                    progress?.progress_data as any
                  )?.finished_modules?.find((v: any) => v === data.id)}
                />
              ))}
            </div>
          </NavSection>
        ))}
      </div>
    </div>
  );
};

export default CourseStructureNav;
