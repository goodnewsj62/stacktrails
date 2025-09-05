type navStore = {
  barIsOpen: boolean;
  toggleBar: (data: { val?: boolean }) => void;
};

type userStore = {
  user: User | null;
  currentProfile: Profile | null;
  setCurrentProfile: (profile: Profile | null) => void;
  setUserData: (data: User | null) => void;
};

interface authStore {
  authToken: string | null;
  refresh: string | null;
  setAuthToken: (data: {
    refresh: string | null;
    token: string | null;
  }) => void;
}

type appStoreType = navStore & userStore;
type mutationType = [];
