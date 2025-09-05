import { StateCreator } from "zustand";

const createNavSlice: StateCreator<
  appStoreType,
  mutationType, //   [], ["zustand/persist", YourPersistedState]
  [],
  navStore
> = (set) => ({
  barIsOpen: false,
  toggleBar: ({ val }) =>
    set((state) => ({
      barIsOpen: typeof val !== "undefined" ? val : !state.barIsOpen,
    })),
});

export default createNavSlice;
