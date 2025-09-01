import LanguageSelector from "@/components/layout/LanguageSelector";
import { PublicRoutes } from "@/routes";
import { Button } from "@mui/material";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

type params = {
  locale: string;
};

const PublicHeader: React.FC<params> = ({ locale }) => {
  const t = useTranslations("PUBLIC_HEADER");
  const linkHelperObject = new PublicRoutes(locale);
  return (
    <header className="flex items-center h-[90px] py-4 px-4 md:px-8 xl:px-16">
      <div className="flex items-baseline">
        <Image src="/black-logo.svg" alt="Logo" width={50} height={50} />
        <h1 className="font-bold text-2xl -translate-1">tackTrails</h1>
      </div>

      <nav className="mx-16">
        <ul className="flex space-x-8">
          {[
            { href: "/courses", label: t("ABOUT") },
            { href: "/about", label: t("EXPLORE") },
            { href: "/contact", label: t("PAID_COURSES") },
            { href: "/contact", label: t("CREATE") },
          ].map((item, idx) => (
            <li key={idx} className="relative">
              <a
                href={item.href}
                className="relative group hover:text-accent transition-colors duration-200 pb-1"
              >
                {item.label}
                <span
                  className="pointer-events-none absolute left-0 bottom-0 w-full h-[2px] bg-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                  aria-hidden="true"
                />
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="ml-auto flex items-center gap-2">
        <LanguageSelector />

        <Button
          size="large"
          variant="text"
          color="inherit"
          sx={{ textTransform: "capitalize" }}
        >
          {t("REGISTER")}
        </Button>
        <Link href={linkHelperObject.getRoutes().LOGIN}>
          <Button
            size="large"
            sx={{ borderRadius: "20px", textTransform: "capitalize" }}
          >
            {t("LOGIN")}
          </Button>
        </Link>
      </div>
    </header>
  );
};

export default PublicHeader;
