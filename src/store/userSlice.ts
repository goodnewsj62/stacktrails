import { StateCreator } from "zustand";

const createUserSlice: StateCreator<
  appStoreType,
  mutationType,
  [],
  userStore
> = (set) => ({
  user: null,
  currentProfile: null,
  setCurrentProfile: (profile: Profile | null) =>
    set(() => ({ currentProfile: profile })),
  setUserData: (user: User | null) => set(() => ({ user })),
});

export default createUserSlice;
