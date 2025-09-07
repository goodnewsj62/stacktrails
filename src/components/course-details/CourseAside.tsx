"use client";

import { Button, IconButton } from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  FaFacebookF,
  FaLayerGroup,
  FaLinkedinIn,
  FaWhatsapp,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { MdGroups } from "react-icons/md";
import StarRating from "../courses/Stars";
import IconAndText from "./IconAndText";

type CourseAsideProps = {};

const CourseAside: React.FC<CourseAsideProps> = () => {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsSticky(scrollTop > 70);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed hidden w-[400px]  ${
        isSticky ? "top-4" : "top-[calc(70px+4rem)]"
      } right-[50%] translate-x-[148%] text-black bg-white rounded-lg py-2 [box-shadow:0px_4px_15px_4px_rgba(0,0,0,0.2)] group transition-all duration-300 xl:block`}
    >
      <div className="relative w-full aspect-video overflow-hidden ">
        <Image
          src={"/1.png"}
          alt={"course thumbnail"}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          style={{ objectFit: "cover" }}
          className="block"
          // onError={() => setImgSrc("/placeholder.png")}
        />
      </div>

      <div className="p-4 flex flex-col gap-4 font-light">
        <p className="text-sm">
          Become a Full-Stack Web Developer with just ONE course. HTML, CSS,
          Javascript, Node, React, PostgreSQL, Web3 and DApps
        </p>
        <EnrollCTAButton />

        <div className="flex items-center gap-1">
          <StarRating rating={4.5} size="medium" />
          <span className="font-medium">4.5</span>
        </div>

        <div className="flex justify-between items-center">
          <IconAndText
            icon={
              <IconButton aria-label="Enrolled" size="small" color="inherit">
                <MdGroups />
              </IconButton>
            }
            text={<span>3M enrolled</span>}
          />
          <IconAndText
            icon={
              <IconButton aria-label="Level" size="small" color="inherit">
                <FaLayerGroup />
              </IconButton>
            }
            text={<span>Beginner friendly</span>}
          />
        </div>
        <div>
          <div className="text-center text-sm">Full Lifetime Access</div>
          <div className="text-center text-sm">share on</div>
        </div>

        {/* Social Share Icons */}
        <div className="flex items-center justify-center gap-4">
          <IconButton
            size="medium"
            className="hover:!bg-gray-100"
            onClick={() =>
              window.open(
                "https://x.com/intent/tweet?text=Check out this amazing course!",
                "_blank"
              )
            }
          >
            <FaXTwitter className="w-5 h-5 text-black" />
          </IconButton>
          <IconButton
            size="medium"
            className="hover:!bg-gray-100"
            onClick={() =>
              window.open(
                "https://www.facebook.com/sharer/sharer.php?u=" +
                  encodeURIComponent(window.location.href),
                "_blank"
              )
            }
          >
            <FaFacebookF className="w-5 h-5 text-black" />
          </IconButton>
          <IconButton
            size="medium"
            className="hover:!bg-gray-100"
            onClick={() =>
              window.open(
                "https://www.linkedin.com/sharing/share-offsite/?url=" +
                  encodeURIComponent(window.location.href),
                "_blank"
              )
            }
          >
            <FaLinkedinIn className="w-5 h-5 text-black" />
          </IconButton>
          <IconButton
            size="medium"
            className="hover:!bg-gray-100"
            onClick={() =>
              window.open(
                "https://wa.me/?text=" +
                  encodeURIComponent(
                    "Check out this amazing course! " + window.location.href
                  ),
                "_blank"
              )
            }
          >
            <FaWhatsapp className="w-5 h-5 text-black" />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default CourseAside;

function EnrollCTAButton() {
  return (
    <Button
      fullWidth
      size="large"
      color={"accentColor" as any}
      className=" !font-bold  !text-white"
    >
      Enroll Now
    </Button>
  );
}
