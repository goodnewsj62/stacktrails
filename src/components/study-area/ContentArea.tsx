"use client";

import PdfViewer from "@/common/document/PDFViewer";
import MarkdownRenderer from "@/common/markdown/AppMdRenderer";
import ConfirmPopup from "@/common/popups/ComfirmPop";
import VidPlayer from "@/common/video/VidPlayer";
import { Button, CircularProgress } from "@mui/material";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { FaLink } from "react-icons/fa";

type ContentAreaProps = {
  module: FullModule;
  isLoading?: boolean;
};
const ContentArea: React.FC<ContentAreaProps> = ({ module, isLoading }) => {
  const t = useTranslations();
  const [showWarning, setShowWarning] = useState(
    module.module_type === "external_link"
  );

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
        <div className="w-full lg:h-[630px]">
          <VidPlayer
            src={
              module.video_content.embed_url || module.video_content.video_url
            }
          />
        </div>
      )}
      {module.module_type === "document" && (
        <div className="w-full relative h-[460px] lg:h-[630px]">
          <PdfViewer url={module.document_content.file_url} />
        </div>
      )}
      {module.module_type === "discussion" && (
        <div className="w-full border-b-16 overflow-y-auto bg-black relative h-[460px] md:px-2 md:border-b-1 lg:h-[630px]">
          <div className="bg-white py-12 px-4 max-w-[calc(80ch+8px)] mx-auto md:px-8">
            <MarkdownRenderer content={(module.content_data as any)?.content} />
          </div>
        </div>
      )}
      {module.module_type === "external_link" && (
        <div className="w-full grid place-items-center border-b-16 overflow-y-auto bg-black relative h-[460px] md:px-2 md:border-b-1 lg:h-[630px]">
          {showWarning && <CircularProgress size={60} />}
          {!showWarning && (
            <Button
              variant="outlined"
              sx={{
                borderColor: "white",
                color: "white",
              }}
              onClick={() => setShowWarning(true)}
            >
              {t("LINK")}
            </Button>
          )}
        </div>
      )}

      <ConfirmPopup
        header={
          <span className="text-red-600">{t("EXTERNAL_LINK.REDIRECT")}</span>
        }
        body={t("EXTERNAL_LINK.WARNING")}
        close={() => setShowWarning(false)}
        isOpen={showWarning}
        proceedCallback={
          () =>
            window.open(
              (module.content_data as any)?.content,
              "_blank",
              "noopener,noreferrer"
            )

          // To set the origin as referrer, we manually create an <a> and click it, since window.open with noreferrer doesn't send a referrer.
          // We'll use a workaround for full control:
          // (Note: This is the only reliable way in the browser, as no-referer disables referrer,
          // so to FORCE current origin as referrer, we must not use rel="noreferrer")

          // const a = document.createElement("a");
          // a.href = (module.content_data as any)?.content;
          // a.target = "_blank";
          // a.rel = "noopener"; // omit 'noreferrer' to allow referer header
          // document.body.appendChild(a);
          // a.click();
          // document.body.removeChild(a);

          // For security, you may want to choose between these two approaches.
        }
        cancelText={t("CANCEL_TEXT")}
        proceedText={t("EXTERNAL_LINK.OK")}
        icon={<FaLink />}
      />
    </div>
  );
};

export default ContentArea;
