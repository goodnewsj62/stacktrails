"use client";

import { DocumentPlatform } from "@/constants";
import useUploadToDrive from "@/hooks/useUploadtoDrive";
import useUploadToDropbox from "@/hooks/useUploadToDropBox";
import { appToast } from "@/lib/appToast";
import { Button, Modal } from "@mui/material";
import { useTranslations } from "next-intl";
import { useState } from "react";
import StorageFileDisplay from "../StorageFileDisplay";
import FileUploadBox from "./FileUploadBox";

type GenericUploadProps = {
  provider: "google_drive" | "dropbox";
  onClose: () => void;
  onCompleted: (urls: string[]) => void;
};
const GenericUpload: React.FC<GenericUploadProps> = ({
  provider,
  onClose,
  onCompleted,
}) => {
  const t = useTranslations();
  const [storageFolder, setStorageFolder] = useState({ name: "", id: "" });
  const [pickFolder, setPickFolder] = useState(false);
  const [file, setFile] = useState<File | null>();
  const uploadToDrive = useUploadToDrive();
  const uploadToDropBox = useUploadToDropbox();

  const changeHandler = () => {
    if (!file) return appToast.Error(t("UPLOAD.CHOOSE_FILE"));

    if (provider === "google_drive")
      uploadToDrive({ files: [file] }).then((d) => {
        onCompleted(d);
        onClose();
      });
    if (provider === "dropbox")
      uploadToDropBox({ files: [file] }).then((d) => {
        onCompleted(d);
        onClose();
      });
  };

  return (
    <Modal open onClose={onClose}>
      <section className="w-[94%] p-4  fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl bg-background md:max-w-[600px]">
        <div className="flex items-center justify-end py-2">
          {pickFolder && (
            <StorageFileDisplay
              chosenFileHandler={(file) => {
                setStorageFolder({
                  name: file.path || file.name,
                  id: file.path || file.id,
                });
              }}
              mimeType="folder"
              onClose={() => setPickFolder(false)}
              provider={provider as DocumentPlatform}
            />
          )}
          <Button
            variant="outlined"
            sx={{ borderColor: "gray", color: "black", fontSize: "12px" }}
            onClick={() => setPickFolder(true)}
            size="small"
          >
            {storageFolder.name || t("UPLOAD.ROOT")}
          </Button>
        </div>
        <div className={``}>
          <FileUploadBox onChange={(file) => setFile(file)} />
        </div>
        <div className="py-2">
          <Button className={""} fullWidth onClick={changeHandler}>
            {t("UPLOAD.UPLOAD")}
          </Button>
        </div>
      </section>
    </Modal>
  );
};

export default GenericUpload;
