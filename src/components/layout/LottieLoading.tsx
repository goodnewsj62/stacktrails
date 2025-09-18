"use client";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useTranslations } from "next-intl";

type props = {
  json_file?: string;
};

const LottieLoadingWrapper: React.FC<props> = ({
  json_file = "/rocket_launch.json",
}) => {
  const t = useTranslations("LOADING");
  return (
    <div className="flex items-center flex-col min-h-[calc(100vh-370px)]">
      <DotLottieReact src={json_file} loop autoplay className="!w-[660px]" />
      <p className="text-lg">{t("PLEASE_WAIT")}...</p>
    </div>
  );
};

export default LottieLoadingWrapper;
