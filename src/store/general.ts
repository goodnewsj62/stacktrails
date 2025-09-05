import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import createNavSlice from "./navSlice";
import createUserSlice from "./userSlice";

export default function createAppStore() {
  return create<appStoreType>()(
    persist(
      immer((...props) => ({
        ...createUserSlice(...props),
        ...createNavSlice(...props),
      })),
      {
        name: "stacktrails",
        partialize: (state) => ({
          barIsOpen: state.barIsOpen,
        }),
      }
    )
  );
}
