import { Button } from "@mui/material";
import { useTranslations } from "next-intl";
import Image from "next/image";

const PublicHeader: React.FC = () => {
  const t = useTranslations("PUBLIC_HEADER");
  return (
    <header className="flex  items-center   h-[90px]  py-4 px-4 md:px-8 xl:px-16">
      <div className="flex items-baseline">
        <Image src="/black-logo.svg" alt="Logo" width={50} height={50} />
        <h1 className="font-bold text-2xl -translate-1">tackTrails</h1>
      </div>

      <nav className="mx-16">
        <ul className="flex space-x-8">
          <li>
            <a href="/courses" className=" hover:text-gray-900">
              About
            </a>
          </li>
          <li>
            <a href="/about" className=" hover:text-gray-900">
              Explore
            </a>
          </li>
          <li>
            <a href="/contact" className=" hover:text-gray-900">
              Paid Courses
            </a>
          </li>
          <li>
            <a href="/contact" className=" hover:text-gray-900">
              Create
            </a>
          </li>
        </ul>
      </nav>

      <div className="ml-auto">
        <Button
          size="large"
          variant="text"
          color="inherit"
          sx={{ textTransform: "capitalize" }}
        >
          {t("REGISTER")}
        </Button>
        <Button
          size="large"
          sx={{ borderRadius: "20px", textTransform: "capitalize" }}
        >
          {t("LOGIN")}
        </Button>
      </div>
    </header>
  );
};

export default PublicHeader;
