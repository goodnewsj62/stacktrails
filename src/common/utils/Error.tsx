"use client";

import { useTranslations } from "next-intl";

type props = {
  title?: string;
  message?: string;
};

export default function Error({ title: inputTitle, message = "" }: props) {
  const images = ["/empty_ghost.svg", "/empty_ufo.svg"];
  const randomImage = images[Math.floor(Math.random() * images.length)];
  const t = useTranslations("EXCEPTIONS");

  const title = inputTitle || t("ERROR_OCCURRED");

  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] p-8">
      <div className="mb-4">
        <img
          src={randomImage}
          alt="Empty state"
          className="w-24 h-24 opacity-50"
        />
      </div>
      <h3 className="text-lg font-semibold text-gray-600 mb-2">{title}</h3>
      {message && (
        <p className="text-sm text-gray-500 text-center max-w-md">{message}</p>
      )}
    </div>
  );
}
