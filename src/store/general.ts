import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import createInitSlice from "./initSlice";
import createNavSlice from "./navSlice";
import createUploadSlice from "./upload";
import createUserSlice from "./userSlice";

export default function createAppStore() {
  return create<appStoreType>()(
    persist(
      immer((...props) => ({
        ...createUserSlice(...props),
        ...createNavSlice(...props),
        ...createInitSlice(...props),
        ...createUploadSlice(...props),
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
