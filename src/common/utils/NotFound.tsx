import { useTranslations } from "next-intl";

export default function Error() {
  const images = ["/robot_404.svg", "/empty_ufo.svg"];
  const randomImage = images[Math.floor(Math.random() * images.length)];
  const t = useTranslations("EXCEPTIONS");

  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] p-8">
      <div className="mb-4">
        <img
          src={randomImage}
          alt="Empty state"
          className="w-24 h-24 opacity-50"
        />
      </div>
      <h3 className="text-lg font-semibold text-gray-600 mb-2">
        {t("ERROR_404")}
      </h3>
      {
        <p className="text-sm text-gray-500 text-center max-w-md">
          {t("NOT_FOUND")}
        </p>
      }
    </div>
  );
}
