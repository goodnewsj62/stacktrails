import { Link } from "@/i18n/navigation";
import { IconButton } from "@mui/material";
import IconAndText from "./IconAndText";

import { Divider } from "@mui/material";
import { CiGlobe } from "react-icons/ci";
import { MdChat, MdGroups } from "react-icons/md";
import { PiClockCountdown } from "react-icons/pi";
import StarRating from "../courses/Stars";

type CourseDetailHeaderProps = {};

const CourseDetailHeader: React.FC<CourseDetailHeaderProps> = () => {
  return (
    <div className="relative flex flex-col gap-6">
      <h1 className="text-2xl md:text-3xl font-black  lg:text-4xl">
        [NEW] Ultimate AWS Certified Cloud Practitioner CLF-C02 2025
      </h1>
      <p>
        Become a Full-Stack Web Developer with just ONE course. HTML, CSS,
        Javascript, Node, React, PostgreSQL, Web3 and DApps
      </p>
      <p>
        <span>created by: </span>
        <Link href={"/"}>Stephane Maarek</Link>
      </p>
      <div className="flex items-center gap-4 -translate-x-2">
        <IconAndText
          icon={
            <IconButton aria-label="Language" size="small" color="inherit">
              <CiGlobe />
            </IconButton>
          }
          text={<span>English</span>}
        />
        <IconAndText
          icon={
            <IconButton aria-label="Language" size="small" color="inherit">
              <PiClockCountdown />
            </IconButton>
          }
          text={<span>Last updated Jul 2025</span>}
        />
      </div>
      <div className="flex gap-8   -left-1  rounded-2xl -bottom-[55%] xl:absolute  xl:bg-white xl:border xl:border-gray-300 xl:p-4 xl:text-black">
        <div className="flex flex-col items-center gap-1">
          <h2 className="text-center font-bold text-2xl md:text-3xl ">4.5</h2>
          <StarRating size="medium" rating={4.5} />
          <p className="text-center text-xs  font-light py-1">2M ratings</p>
        </div>
        <Divider
          orientation="vertical"
          sx={{
            height: "60px",
            borderColor: "rgba(0,0,0,0.2)",
            alignSelf: "center",
          }}
        />

        <div className="flex flex-col items-center gap-1">
          {/* <IconButton aria-label="Enrolled" size="large" color="inherit">
       
     </IconButton> */}
          <MdGroups className="w-8 h-8" />
          <div className=" font-semibold">1,250,000</div>
          <div className="text-xs font-light">enrolled</div>
        </div>

        <Divider
          orientation="vertical"
          sx={{
            height: "60px",
            borderColor: "rgba(0,0,0,0.2)",
            alignSelf: "center",
          }}
        />

        <div className="flex flex-col items-center gap-1 xl:translate-y-2">
          {/* <IconButton aria-label="Enrolled" size="large" color="inherit">
       
     </IconButton> */}
          <MdChat className="w-6 h-6" />
          <div className=" font-semibold">1,250,000</div>
          <div className="text-xs font-light">community comments</div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailHeader;
