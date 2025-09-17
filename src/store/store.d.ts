type navStore = {
  barIsOpen: boolean;
  toggleBar: (data: { val?: boolean }) => void;
};

type initStore = {
  isLoading: boolean;
  setIsLoading: (data: boolean) => void;
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

type UploadJob = {
  id: string;
  name?: string;
  type: "google_drive" | "youtube" | "dropbox";
  status: "pending" | "uploading" | "completed" | "failed";
  progress: number;
  cancel?: () => void;
};

type UploadStore = {
  jobs: UploadJob[];
  addJob: (job: Omit<UploadJob, "status" | "progress">) => string;
  updateJob: (id: string, data: Partial<UploadJob>) => void;
  removeJob: (id: string) => void;
};

type appStoreType = navStore & userStore & initStore & UploadStore;
type mutationType = [];
