"use client";

import { PublicRoutes } from "@/routes";
import { useLocale } from "next-intl";
import Image from "next/image";
import Link from "next/link";

type SocialAuthProps = {
  login?: boolean;
};
const SocialAuth: React.FC<SocialAuthProps> = ({ login }) => {
  const locale = useLocale();
  const router = new PublicRoutes(locale).getRoutes();
  return (
    <div className="flex flex-col gap-4 w-full h-full items-center justify-center">
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
        {login ? "Welcome back" : "Welocme to Stacktrials"}
      </h1>
      {true && (
        <p className="text-[#6c757d] max-w-[60ch] font-light  text-center">
          Create an account to connect with like-minded individuals, explore
          well-curated courses, and learn smarter together.
        </p>
      )}
    </div>
  );
};

export default SocialAuth;
