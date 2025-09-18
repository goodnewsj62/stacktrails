import { use } from "react";
import { useStore } from "zustand";
import { AppStoreContext } from "./provider";

export const useAppStore = <T>(selector: (store: appStoreType) => T): T => {
  const storeContext = use(AppStoreContext);

  if (!storeContext) {
    throw new Error(`useCounterStore must be used within CounterStoreProvider`);
  }

  return useStore(storeContext, selector);
};
