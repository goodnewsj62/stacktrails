"use client";

import { Link } from "@/i18n/navigation";
import Image from "next/image";
import React from "react";
import { FaStar } from "react-icons/fa";
import { MdOutlineComment } from "react-icons/md";

type CourseCardProps = {
  title?: string;
  page?: string;
  imageSrc?: string;
  // optional: let parent override sizing classes (e.g. "h-96")
  className?: string;
  heightClass?: string;
};

const CourseCard: React.FC<CourseCardProps> = ({
  title = "Course title",
  page = "divinna",
  imageSrc = "/2.png",
  className = "",
  heightClass = "h-80", // default card height; parent can override
}) => {
  return (
    <article
      className={`w-full ${heightClass}    overflow-hidden rounded-lg  ${className}`}
    >
      {/* Image area = 70% of height flex-[7] */}
      <Link href={"/"} className="block relative h-[62%] w-full">
        <Image
          src={imageSrc}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          style={{ objectFit: "cover" }}
          className="block rounded-2xl"
        />
      </Link>

      {/* Content area = remaining 30% flex-[3] */}
      <div className="p-4 flex flex-col justify-between">
        <div>
          <Link href={"/"}>
            <h3 className="font-semibold line-clamp-2">{title}</h3>
          </Link>
          <Link href={`/`} className="text-sm text-blue-600 hover:underline">
            {page}
          </Link>
        </div>

        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-4  text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <FaStar className="text-yellow-500" />
              <span>4.5</span>
            </div>

            <div className="flex items-center gap-2">
              <span>1k</span>
              <MdOutlineComment />
            </div>
          </div>

          <div className="text-xs text-gray-400 mt-2">26 mins ago</div>
        </div>
      </div>
    </article>
  );
};

export default CourseCard;
