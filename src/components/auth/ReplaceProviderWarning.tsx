"use client";

import { useRouter } from "@/hooks/useBlockNavigation";
import { appToast } from "@/lib/appToast";
import appAxios from "@/lib/axiosClient";
import { BackendRoutes } from "@/routes";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Button, Modal } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { PropsWithChildren } from "react";

type ReplaceProviderWarningProps = PropsWithChildren;
const ReplaceProviderWarningWrapper: React.FC<ReplaceProviderWarningProps> = ({
  children,
}) => {
  const searchParams = useSearchParams();
  const replaceProvider = searchParams.get("replace_provider");
  const tempId = searchParams.get("temp_id");
  const router = useRouter();

  const show = !!(replaceProvider && tempId);

  return (
    <>
      {children}
      {show && (
        <Warning
          onClose={() => {
            const params = new URLSearchParams(searchParams.toString());
            params.delete("replace_provider");
            params.delete("temp_id");

            const url =
              window.location.pathname.substring(3) +
              (params.toString() ? `?${params}` : "");

            router.replace(url || "/");
          }}
          provider={replaceProvider as any}
          tempId={tempId as any}
        />
      )}
    </>
  );
};

export default ReplaceProviderWarningWrapper;

function Warning({
  onClose,
  provider,
  tempId,
}: {
  tempId: string;
  provider: string;
  onClose: () => void;
}) {
  const t = useTranslations();
  const { mutate } = useMutation({
    mutationFn: async () => {
      await appAxios.post(BackendRoutes.REPLACE_PROVIDER, null, {
        params: {
          temp_id: tempId,
        },
      });
    },
    onSuccess() {
      appToast.Success(t("REPLACE_ACCOUNT.SUCCESS"));
      onClose();
    },
    onError(error, variables, context) {
      appToast.Error(t("EXCEPTIONS.ERROR_OCCURRED"));
    },
  });
  return (
    <Modal onClose={() => {}} open>
      <div className="w-[94%] fixed left-1/2 top-1/2 z-[60] -translate-x-1/2 -translate-y-1/2 [box-shadow:0px_0px_10px_5px_rgba(0,0,0,0.08)] rounded-lg bg-background md:max-w-[500px]">
        <div className="flex p-4 items-center flex-col ">
          <div className="w-[300px]">
            <DotLottieReact
              src={"/airplane.json"}
              loop
              autoplay
              className="w-full"
            />
          </div>

          <div className="flex flex-col gap-2 items-center">
            <h2 className="text-2xl font-bold">
              {t("REPLACE_ACCOUNT.ACCOUNT_SWITCH")}
            </h2>
            <p className="text-sm px-2 text-center">
              {t("REPLACE_ACCOUNT.WARNING", { provider })}
            </p>
            <div className="flex pt-2 items-center justify-center gap-6">
              <Button color="error" fullWidth onClick={onClose}>
                {t("CANCEL")}
              </Button>
              <Button fullWidth onClick={() => mutate()}>
                {t("CONTINUE")}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
