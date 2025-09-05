"use client";

import appAxios from "@/lib/axiosClient";
import { cacheKeys } from "@/lib/cacheKeys";
import { BackendRoutes } from "@/routes";
import { useAppStore } from "@/store";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { PropsWithChildren, useEffect } from "react";

type props = PropsWithChildren;

export default function AuthWrapper({ children }: props) {
  const { data, status } = useQuery({
    queryKey: [cacheKeys.MY_ACCOUNT],
    queryFn: async (): Promise<AxiosResponse<User>> =>
      await appAxios.get(BackendRoutes.MY_ACCOUNT),
  });

  const { setUserData, setCurrentProfile } = useAppStore((state) => state);

  useEffect(() => {
    if (status === "success") {
      setUserData(data.data);
      setCurrentProfile(data.data.profile);
    }
  }, [status]);

  return children;
}
