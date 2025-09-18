"use client";

import { appToast } from "@/lib/appToast";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { AvailableSources } from "./media.constants";
import CustomMenu from "./Sources";
import UploadWrapper from "./UploadWrapper";

//

type UploadFileProps = {
  accept: AvailableSources[];
  mimeType?: "video" | "document" | "image";
  callback: (url: string, provider: AvailableSources) => void;
};

type plugins = "link" | "pick" | "upload";

type Strategy = {
  plugins: plugins[];
  linkValidator?: (v: string) => boolean;
};

const strategies: Record<AvailableSources, Strategy> = {
  google_drive: {
    plugins: ["upload", "pick"],
  },
  drop_box: {
    plugins: ["upload", "pick"],
  },
  daily_motion: {
    plugins: ["link"],
    linkValidator: (link: string) => true,
  },
  youtube: {
    plugins: ["upload", "link"],
    linkValidator: (link: string) => true,
  },
  link: {
    plugins: ["link"],
  },
};

//
const UploadFile: React.FC<UploadFileProps> = ({
  accept,
  callback,
  mimeType,
}) => {
  const t = useTranslations();
  const [error, setError] = useState("");
  const [source, setSource] = useState<AvailableSources>(accept[0]);

  const uploadedCallback = (url: string, plugin: plugins) => {
    if (plugin === "link") {
      const validator = strategies[source]?.linkValidator;

      if (validator && !validator(url)) {
        appToast.Error(t("UPLOAD.INVALID_LINK"));
        return;
      }
    }

    callback(url, source);
  };

  const plugins = strategies[source].plugins;

  return (
    <div className="rounded-xl bg-background ">
      <div className="py-4">
        <CustomMenu
          callback={(value: any) => setSource(value)}
          defaultVal={source}
          sources={accept}
        />
      </div>

      <div className="flex flex-col gap-4">
        {plugins.map((val) => (
          <div className="" key={val}>
            {val === "upload" && (
              <UploadWrapper
                onCompleted={(url) => uploadedCallback(url, "upload")}
                type="upload"
                provider={source}
                mimeType={mimeType || "document"}
              />
            )}
            {val === "pick" && (
              <UploadWrapper
                onCompleted={(url) => uploadedCallback(url, "pick")}
                type="picker"
                provider={source}
                mimeType={mimeType || "document"}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UploadFile;
