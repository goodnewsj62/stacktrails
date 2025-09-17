import { DocumentPlatform } from "@/constants";
import { BackendRoutes } from "@/routes";
import appAxios from "../axiosClient";

export async function listFolder({
  params,
}: {
  params?: Record<string, any>;
}): Promise<StorageResp[]> {
  const res = await appAxios.get<any>(BackendRoutes.LIST_ALL_FOLDERS, {
    params,
  });

  return res.data;
}

export async function listFiles({
  params,
}: {
  params?: Record<string, any>;
}): Promise<StorageResp[]> {
  const res = await appAxios.get<any>(BackendRoutes.LIST_ALL_FILES, { params });

  return res.data;
}

export async function listStorageProviders(): Promise<ProviderList> {
  const res = await appAxios.get<any>(
    BackendRoutes.LIST_ACTIVE_STORAGE_PROVIDERS
  );

  return res.data;
}
export async function listProviders(): Promise<ProviderList> {
  const res = await appAxios.get<any>(BackendRoutes.LIST_ACTIVE_PROVIDERS);

  return res.data;
}

export async function listSubFolderAndFiles({
  params: { folder, mimeType, provider },
}: {
  params: {
    folder: string;
    mimeType: "image" | "document" | "video";
    provider: DocumentPlatform;
  };
}): Promise<FileFolderResp> {
  const res = await appAxios.get<any>(
    BackendRoutes.LIST_SUB_FOLDERS_AND_FILES,
    {
      params: {
        folder,
        mime_type: mimeType,
        provider,
      },
    }
  );

  return res.data;
}
