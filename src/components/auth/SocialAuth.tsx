"use client";

import { PublicRoutes } from "@/routes";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

type SocialAuthProps = {
  login?: boolean;
};
const SocialAuth: React.FC<SocialAuthProps> = ({ login }) => {
  const locale = useLocale();
  const router = new PublicRoutes(locale).getRoutes();
  const t = useTranslations();
  return (
    <div className="max-w-[68ch] flex flex-col  gap-4 w-full h-full items-center justify-center">
      <Link href={router.HOME}>
        <Image
          src={"/black-logo.svg"}
          width={60}
          height={60}
          alt={"logo"}
          className=""
        />
      </Link>
      <h1 className="text-2xl font-bold">
        {login ? t("AUTH.WELCOME_BACK") : t("AUTH.WELCOME")}
      </h1>
      {!login && (
        <p className="text-[#6c757d] max-w-[60ch] font-light  text-center">
          {t("AUTH.INTRODUCTION")}
        </p>
      )}

      <div className="text-[#6c757d] max-w-[60ch] font-light  text-center text-sm">
        {t("AUTH.AGREEMENT_START_PHRASE")}{" "}
        <Link href={router.TERMS} className="text-primary">
          {t("AUTH.TERMS")}
        </Link>{" "}
        {t("AND")}{" "}
        <Link href={router.POLICY} className="text-primary">
          {t("AUTH.PRIVACY")}
        </Link>
      </div>

      {login ? (
        <div className="text-[#6c757d] max-w-[60ch] font-light  text-center text-sm">
          {t("AUTH.HAVE_ACCOUNT")}{" "}
          <Link href={router.REGISTER} className="underline">
            {t("AUTH.REGISTER")}
          </Link>
        </div>
      ) : (
        <div className="text-[#6c757d] max-w-[60ch] font-light  text-center text-sm">
          {t("AUTH.ALREADY_HAVE_AN_ACCOUNT")}{" "}
          <Link href={router.LOGIN} className="underline">
            {t("PUBLIC_HEADER.LOGIN")}
          </Link>
        </div>
      )}
    </div>
  );
};

export default SocialAuth;
