"use client";

import { useGoogleOneTapLogin } from "@react-oauth/google";

export default function GoogleOneTapWrapper() {
  useGoogleOneTapLogin({
    onSuccess: (credentialResponse) => {
      console.log(credentialResponse);
    },
    onError: () => {
      console.log("Login Failed");
    },
  });
  return <></>;
}
