"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const images = [
  "/fingerprint-animate.svg",
  "/man-reading-animate.svg",
  "/reading-glasses-animate.svg",
  "/typing-animate.svg",
  "/woman-reading-animate.svg",
];

type SideDesignProps = {};
const SideDesign: React.FC<SideDesignProps> = ({}) => {
  const [index, setIndex] = useState(0);
  const ref = useRef(0);

  useEffect(() => {
    const animeCallback = (timer: number) => {
      const interval = 10000;

      if (timer - ref.current >= interval) {
        setIndex((state) => (state >= 4 ? 0 : state + 1));
        ref.current = timer;
      }

      requestAnimationFrame(animeCallback);
    };

    requestAnimationFrame(animeCallback);
  }, []);

  return (
    <div className="bg-[#a4bef3c0] h-full w-full flex flex-col items-center  justify-center">
      <Image
        src={images[index]}
        alt="display"
        width={500}
        height={600}
        className=""
      />
    </div>
  );
};

export default SideDesign;
