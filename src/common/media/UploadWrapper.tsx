"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { AvailableSources } from "./media.constants";
import GenericUpload from "./provider/GenericUpload";
import YoutubeUpload from "./provider/YoutubeUpload";
import StorageFileDisplay from "./StorageFileDisplay";

type UploadWrapperProps = {
  type: "upload" | "picker";
  onCompleted: (url: string, provider: AvailableSources) => void;
  storage?: string;
  provider: AvailableSources;
  mimeType: "image" | "document" | "video";
};

const UploadWrapper: React.FC<UploadWrapperProps> = ({
  type,
  onCompleted,
  storage,
  mimeType,
  provider,
}) => {
  const t = useTranslations();
  const [show, setShow] = useState(false);

  const showPicker = type === "picker" && show;
  const showUploader = type === "upload" && show;
  return (
    <div className="w-full">
      <button
        className="w-full h-[200px] border-gray-200 border-2  rounded-md flex flex-col items-center justify-center"
        type="button"
        onClick={() => setShow(true)}
      >
        <span>
          {type === "upload"
            ? t("UPLOAD.UPLOAD_FILE")
            : t("UPLOAD.SELECT", { storage: storage || "storage" })}
        </span>
      </button>

      {type === "picker" && (
        <p className="py-2 text-sm text-gray-400">{t("UPLOAD.WARNING_TEXT")}</p>
      )}

      {showUploader && (
        <SourcesSwitch onClose={() => setShow(false)} provider={provider} />
      )}
      {showPicker && (
        <StorageFileDisplay
          chosenFileHandler={(file, provider) => {
            console.log("called");
            onCompleted(
              file.url || "",
              provider === "dropbox" ? "drop_box" : (provider as any)
            );
            setShow(false);
          }}
          mimeType={mimeType}
          onClose={() => setShow(false)}
          provider={provider === "drop_box" ? "dropbox" : (provider as any)}
        />
      )}
    </div>
  );
};

export default UploadWrapper;

function SourcesSwitch({
  onClose,
  provider,
}: {
  onClose: () => void;
  provider: AvailableSources;
}) {
  switch (provider) {
    case "daily_motion":
      return <></>;
    case "google_drive":
      return <GenericUpload onClose={onClose} provider={"google_drive"} />;
    case "drop_box":
      return <GenericUpload onClose={onClose} provider={"dropbox"} />;
    case "youtube":
      return <YoutubeUpload />;
  }
}
