"use client";

import VidPlayer from "@/common/video/VidPlayer";
import { CircularProgress } from "@mui/material";

type ContentAreaProps = {
  module: FullModule;
  isLoading?: boolean;
};
const ContentArea: React.FC<ContentAreaProps> = ({ module, isLoading }) => {
  if (isLoading) {
    return (
      <div className="w-full grid place-items-center h-[630px] bg-black">
        <CircularProgress size={60} />
      </div>
    );
  }
  return (
    <div className="h-full w-full">
      {module.module_type === "video" && (
        <div className="w-full h-[630px]">
          <VidPlayer
            src={
              module.video_content.embed_url || module.video_content.video_url
            }
          />
        </div>
      )}
    </div>
  );
};

export default ContentArea;
