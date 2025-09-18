"use client";

import { appToast } from "@/lib/appToast";
import { googleOneTapForm } from "@/lib/utils";
import { useAppStore } from "@/store";
import { useGoogleOneTapLogin } from "@react-oauth/google";
import { useTranslations } from "next-intl";

export default function GoogleOneTapWrapper() {
  const { user, isLoading } = useAppStore((state) => state);

  const t = useTranslations("GOOGLE_AUTH_MESSAGES.ERRORS");
  useGoogleOneTapLogin({
    onSuccess: (credentialResponse) => {
      if (credentialResponse.credential) {
        // Create and submit form
        googleOneTapForm(credentialResponse.credential);
      } else appToast.Error(t("ERROR_LOGIN"));
    },
    onError: () => {
      appToast.Error(t("ERROR_LOGIN"));
    },
    disabled: isLoading || !!user,
  });

  return <></>;
}
