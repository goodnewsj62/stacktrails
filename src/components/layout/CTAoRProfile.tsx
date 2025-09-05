"use client";

import { Link } from "@/i18n/navigation";
import { PublicRoutes } from "@/routes";
import { useAppStore } from "@/store";
import { Button } from "@mui/material";
import { useTranslations } from "next-intl";
import Profile from "./Profile";

export default function CTAORProfie() {
  const user = useAppStore((state) => state.user);
  const t = useTranslations("PUBLIC_HEADER");
  return (
    <>
      {!user && (
        <>
          <Link href={PublicRoutes.REGISTER}>
            <Button
              size="large"
              variant="text"
              color="inherit"
              sx={{ textTransform: "capitalize" }}
            >
              {t("REGISTER")}
            </Button>
          </Link>
          <Link href={PublicRoutes.LOGIN}>
            <Button
              size="large"
              sx={{ borderRadius: "20px", textTransform: "capitalize" }}
            >
              {t("LOGIN")}
            </Button>
          </Link>
        </>
      )}

      {user && (
        <div>
          <Profile />
        </div>
      )}
    </>
  );
}
