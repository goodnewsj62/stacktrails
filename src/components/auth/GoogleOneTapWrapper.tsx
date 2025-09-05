"use client";

import { appToast } from "@/lib/appToast";
import { googleOneTapForm } from "@/lib/utils";
import { useAppStore } from "@/store";
import { useGoogleOneTapLogin } from "@react-oauth/google";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

export default function GoogleOneTapWrapper() {
  const [disabled, setDisabled] = useState(true);
  const user = useAppStore((state) => state.user);

  useEffect(() => {
    const wait = setTimeout(() => setDisabled(!user), 1000);
    return () => clearTimeout(wait);
  }, []);

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
    disabled,
  });
  if (user) {
    return <></>;
  }
  return user ? <></> : <Wrapped />;
}

function Wrapped() {
  return <></>;
}
