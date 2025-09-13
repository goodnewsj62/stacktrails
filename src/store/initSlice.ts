import { StateCreator } from "zustand";

const createInitSlice: StateCreator<
  appStoreType,
  mutationType, //   [], ["zustand/persist", YourPersistedState]
  [],
  initStore
> = (set) => ({
  isLoading: true,
  setIsLoading: (state) => set({ isLoading: state }),
});

export default createInitSlice;
