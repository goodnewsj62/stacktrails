import { cn } from "@/utilities";
import { ButtonHTMLAttributes, DetailedHTMLProps, JSX } from "react";
import { CustomSpinerIcon } from "../icons";

interface Props
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  isLoading: boolean;
}

const SubmitButton = ({
  isLoading,
  title,
  disabled,
  className,
  ...otherProps
}: Props): JSX.Element => {
  return (
    <button
      {...otherProps}
      className={cn(
        "mx-auto flex w-full items-center justify-center gap-2 rounded-2xl bg-appBlue100 p-4 text-sm font-medium text-white transition-all duration-300 hover:scale-105 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      type="submit"
      disabled={disabled || isLoading}
    >
      <span>{title ?? "Submit"}</span>
      {isLoading && (
        <CustomSpinerIcon className="text-appBlue200 animate-spin text-xl opacity-50" />
      )}
    </button>
  );
};

export default SubmitButton;
