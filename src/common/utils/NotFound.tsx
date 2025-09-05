import { useTranslations } from "next-intl";
import Image from "next/image";
type props = {
  width?: number;
  height?: number;
  className?: string;
};
export default function NotFoundDisplay({ className, height, width }: props) {
  const images = ["/robot_404.svg", "/empty_ufo.svg"];
  const randomImage = images[Math.floor(Math.random() * images.length)];
  const t = useTranslations("EXCEPTIONS");

  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] p-8">
      <div className="mb-4">
        <Image
          src={randomImage}
          alt="Empty state"
          width={width || 320}
          height={height || 320}
          className={`w-full max-w-[320px] ${className}`}
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
