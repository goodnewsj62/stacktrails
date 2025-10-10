"use client";

import { Tab, Tabs } from "@mui/material";
import { useState } from "react";

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

type StudyTabsProps = {};
const StudyTabs: React.FC<StudyTabsProps> = ({}) => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div>
      <Tabs value={value} onChange={handleChange}>
        <Tab
          label="Course Items"
          sx={{ textTransform: "capitalize" }}
          {...a11yProps(0)}
        />
        <Tab
          label="Chats"
          sx={{ textTransform: "capitalize" }}
          {...a11yProps(1)}
        />
      </Tabs>
    </div>
  );
};

export default StudyTabs;
