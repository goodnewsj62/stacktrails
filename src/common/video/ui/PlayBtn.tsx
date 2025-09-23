"use client";

import { FaPlay } from "react-icons/fa";

export default function PlayButton({ onClick }: { onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      type="button"
      className="
        absolute 
        left-1/2 
        top-1/2 
        -translate-x-1/2 
        -translate-y-1/2
        flex items-center justify-center
        w-20 h-20
        rounded-full
        bg-[rgba(255,255,255,0.15)]
        hover:scale-125
        transition-transform
        z-[100]
      "
    >
      <div className="bg-white w-[70%] h-[70%] flex items-center justify-center rounded-full ">
        <FaPlay className="text-blue-500 text-2xl ml-1" />
      </div>
    </button>
  );
}
