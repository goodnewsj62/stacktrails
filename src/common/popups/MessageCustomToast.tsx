"use client";

import { Button } from "@mui/material";
import { ReactNode } from "react";
import { toast as sonnerToast } from "sonner";

/** I recommend abstracting the toast function
 *  so that you can call it without having to use toast.custom everytime. */
export default function messageToast(toast: Omit<ToastProps, "id">) {
  return sonnerToast.custom(
    (id) => (
      <Toast
        id={id}
        title={toast.title}
        description={toast.description}
        button={toast.button}
      />
    ),
    {
      toasterId: "canvas",
      onAutoClose() {
        toast?.onClose?.();
      },
    }
  );
}

/** A fully custom toast that still maintains the animations and interactions. */
function Toast(props: ToastProps) {
  const { title, description, button, id } = props;

  return (
    <div className="flex flex-col gap-2 border border-gray-200 rounded-lg bg-background shadow-lg ring-1 ring-black/5 w-full  p-4 md:w-[400px] ">
      <div className="flex flex-1 items-center">
        <div className="w-full">
          {title && <div className="font-medium text-gray-900">{title}</div>}
          {description && (
            <p className="mt-1 text-sm text-gray-600">{description}</p>
          )}
        </div>
      </div>
      {button && (
        <div className="">
          <Button
            fullWidth
            className="!capitalize"
            onClick={() => {
              button?.onClick();
              sonnerToast.dismiss(id);
            }}
          >
            {button?.label}
          </Button>
        </div>
      )}
    </div>
  );
}

interface ToastProps {
  id: string | number;
  title?: ReactNode;
  description?: string;
  button?: {
    label: string;
    onClick: () => void;
  };
  onClose?: () => void;
}
