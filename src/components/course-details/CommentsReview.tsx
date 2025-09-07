"use client";

import Comment from "@/common/comment/Comment";
import ReviewComponent from "@/common/comment/ReviewComponent";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import * as React from "react";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export const comments = [
  {
    username: "Alice Johnson",
    avatarUrl: "",
    timeAgo: "2h ago",
    text: "This is super helpful, thanks for sharing! 🚀",
  },
  {
    username: "David Kim",
    avatarUrl: "",
    timeAgo: "5h ago",
    text: "I totally agree with your point here. Very insightful!",
  },
  {
    username: "Sophia Martinez",
    avatarUrl: "",
    timeAgo: "1d ago",
    text: "Could you expand a bit more on how this works? I’m curious.",
  },
  {
    username: "James Smith",
    avatarUrl: "",
    timeAgo: "3d ago",
    text: "I’ve tried this before, but your explanation made it way clearer. Thanks!",
  },
  {
    username: "Emily Brown",
    avatarUrl: "",
    timeAgo: "1w ago",
    text: "This is exactly what I was looking for 👏",
  },
];

type CommentsReviewProps = {};
const CommentsReview: React.FC<CommentsReviewProps> = ({}) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">comments & ratings</h2>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Reviews & Ratings" {...a11yProps(0)} />
            <Tab label="Community Comments" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          {comments.map(({ text, username }) => (
            <ReviewComponent
              key={text + username}
              text={text}
              username={username}
            />
          ))}
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          {comments.map(({ text, username, timeAgo }) => (
            <Comment
              key={text + username}
              text={text}
              username={username}
              timeAgo={timeAgo}
              avatarUrl=""
            />
          ))}
        </CustomTabPanel>
      </Box>
    </section>
  );
};

export default CommentsReview;
