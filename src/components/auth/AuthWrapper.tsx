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
    select: (data) => data.data,
    retry: false,
  });

  const { setUserData, setCurrentProfile, setIsLoading } = useAppStore(
    (state) => state
  );

  useEffect(() => {
    switch (status) {
      case "success":
        setUserData(data);
        setCurrentProfile(data.profile);
        setIsLoading(false);
        break;
      case "error":
        setIsLoading(false);
        break;
      case "pending":
        setIsLoading(true);
        break;
    }
  }, [status]);

  return children;
}
