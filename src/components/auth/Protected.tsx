"use client";

import { useRouter } from "@/i18n/navigation";
import { PublicRoutes } from "@/routes";
import { useAppStore } from "@/store";
import { PropsWithChildren } from "react";

export default function Protected({ children }: PropsWithChildren) {
  const { user } = useAppStore((state) => state);
  const router = useRouter();
  if (!user) return router.push(PublicRoutes.LOGIN);
  return children;
}
