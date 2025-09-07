import { IconButton } from "@mui/material";
import { BsBackpack2Fill } from "react-icons/bs";
import { FaMedal } from "react-icons/fa";
import { HiMiniSquare3Stack3D } from "react-icons/hi2";
import { IoIosAlarm } from "react-icons/io";
import { IoCheckmarkDoneOutline } from "react-icons/io5";

type CourseInfoProps = {
  objectives?: string[];
  prerequisites?: string[];
  features?: { value: string; icon: React.ReactNode }[];
};

const CourseInfo: React.FC<CourseInfoProps> = ({
  objectives = [
    "Build responsive websites with HTML5 and CSS3",
    "Master JavaScript ES6+ and modern frameworks",
    "Create dynamic web applications with React",
    "Build backend APIs with Node.js and Express",
    "Work with databases (MongoDB, PostgreSQL)",
    "Deploy applications to cloud platforms",
    "Implement authentication and security",
    "Use Git and GitHub for version control",
  ],
  prerequisites = [
    "Basic computer skills",
    "No programming experience required",
    "Willingness to learn and practice",
  ],
  features = [
    { value: "Certificate of completion", icon: <FaMedal /> },
    { value: "Beginner friendly", icon: <HiMiniSquare3Stack3D /> },
    { value: "Free enrollment", icon: <BsBackpack2Fill /> },
    { value: "45 hours of content", icon: <IoIosAlarm /> },
  ],
}) => {
  return (
    <section className="space-y-8">
      {/* What You'll Learn */}
      <div className="rounded-xl border border-gray-300 p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          What you'll learn
        </h2>
        <div className="grid gap-4 text-sm font-light grid-cols-1 md:grid-cols-2 ">
          {objectives.map((objective, index) => (
            <div key={"objective" + index} className="flex items-start gap-3">
              <IconButton
                aria-label="Objective"
                size="small"
                color="inherit"
                className="!p-0 !min-w-0"
              >
                <IoCheckmarkDoneOutline className="flex-shrink-0 mt-0.5" />
              </IconButton>
              <span className="text-gray-700 text-sm leading-relaxed">
                {objective}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Prerequisites */}
      <div className="rounded-xl  py-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Requirements</h2>
        <ul className="space-y-3">
          {prerequisites.map((prerequisite, index) => (
            <li
              key={"prerequisites" + index}
              className="flex items-start gap-3"
            >
              <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
              <span className="text-gray-700 text-sm">{prerequisite}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Course Features */}
      <div className="rounded-xl py-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Course Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {features.map(({ value, icon }, index) => (
            <div key={"features" + index} className="flex items-center gap-3">
              <IconButton
                aria-label="Objective"
                size="small"
                color="inherit"
                className="!p-0 !min-w-0"
              >
                {icon}
              </IconButton>
              <span className="text-gray-700 text-sm">{value}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CourseInfo;
