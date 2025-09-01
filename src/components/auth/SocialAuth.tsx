"use client";

import { PublicRoutes } from "@/routes";
import { GoogleLogin } from "@react-oauth/google";
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

      <div className="w-full max-w-sm space-y-4">
        {/* Google Login Button */}
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            console.log(credentialResponse);
          }}
          onError={() => {
            console.log("Login Failed");
          }}
        />

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">{t("AUTH.OR")}</span>
          </div>
        </div>

        {/* GitHub Login Button */}
        <button
          onClick={() => {
            // TODO: Implement GitHub OAuth
            console.log("GitHub login clicked");
          }}
          className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          <Image
            src="/github-icon.svg"
            width={20}
            height={20}
            alt="GitHub"
            className="w-5 h-5 text-gray-700"
          />
          <span className="text-gray-700 font-medium">
            {t("AUTH.CONTINUE_WITH_GITHUB")}
          </span>
        </button>
      </div>

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
