"use client";

import { Link } from "@/i18n/navigation";
import { getImageProxyUrl, getNumberUnit, timeAgo } from "@/lib/utils";
import Image from "next/image";
import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { MdOutlineComment } from "react-icons/md";

type CourseCardProps = {
  course: Course;
  // optional: let parent override sizing classes (e.g. "h-96")
  className?: string;
  heightClass?: string;
};

const CourseCard: React.FC<CourseCardProps> = ({
  course,
  className = "",
  heightClass = "h-80", // default card height; parent can override
}) => {
  const [imgSrc, setImgSrc] = useState(
    getImageProxyUrl(course.image) || "/placeholder.png"
  );

  return (
    <article
      className={`w-full ${heightClass}    overflow-hidden rounded-lg  ${className}`}
    >
      {/* Image area = 70% of height flex-[7] */}
      <Link href={"/"} className="block relative h-[62%] w-full">
        <Image
          src={imgSrc}
          alt={"course thumbnail"}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          style={{ objectFit: "cover" }}
          className="block rounded-2xl"
          onError={() => setImgSrc("/placeholder.png")}
        />
      </Link>

      {/* Content area = remaining 30% flex-[3] */}
      <div className="p-4 flex flex-col justify-between">
        <div>
          <Link href={"/"}>
            <h3 className="font-semibold line-clamp-2">{course.title}</h3>
          </Link>
          <Link href={`/`} className="text-sm text-blue-600 hover:underline">
            {course.author.username}
          </Link>
        </div>

        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-4  text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <FaStar className="text-yellow-500" />
              <span>{course.average_rating}</span>
            </div>

            <div className="flex items-center gap-2">
              <span>{getNumberUnit(course.comment_count)}</span>
              <MdOutlineComment />
            </div>
          </div>

          <div className="text-xs text-gray-400 mt-2">
            {timeAgo(course.updated_at)}
          </div>
        </div>
      </div>
    </article>
  );
};

export default CourseCard;
