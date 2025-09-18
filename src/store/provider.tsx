// src/providers/counter-store-provider.tsx
"use client";

import { PropsWithChildren, createContext, useRef } from "react";

import createAppStore from "./general";

export type appStoreApi = ReturnType<typeof createAppStore>;

export const AppStoreContext = createContext<appStoreApi | undefined>(
  undefined
);

export const StoreProvider = ({ children }: PropsWithChildren) => {
  const storeRef = useRef<appStoreApi | null>(null);
  if (storeRef.current === null) {
    storeRef.current = createAppStore();
  }

  return <AppStoreContext value={storeRef.current}>{children}</AppStoreContext>;
};
