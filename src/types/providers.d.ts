type ProviderList = {
  items: ProviderResp[];
};

type ProviderResp = {
  provider: Providers;
  provider_id: string;
  scopes?: string;
  expires_at?: string;
};

type Providers = "google" | "github" | "dropbox";

type FileResp = {
  id: string;
  name: string;
  type: "file" | "folder";
  mime_type?: string;
  path?: string;
  url?: string;
};

type FileFolderResp = FileResp[];
