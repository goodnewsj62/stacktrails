import { TextField, TextFieldProps } from "@mui/material";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

type props<TFieldValues extends FieldValues = FieldValues> = Omit<
  TextFieldProps,
  "variant"
> & {
  control: Control<TFieldValues, any> | undefined;
  helperText?: string;
  defaultValue?: any;
  name: Path<TFieldValues>;
  optionalText?: boolean;
  message?: any;
};

const AppTextField = <T extends FieldValues = FieldValues>({
  control,
  message,
  name,
  helperText = "",
  defaultValue = "",
  optionalText = false,
  ...props
}: props<T>) => {
  const hasError = !!message;
  return (
    <Controller
      render={({ field }) => (
        <>
          <TextField
            {...field}
            {...props}
            error={hasError}
            helperText={hasError ? message : helperText}
          />
          {optionalText && (
            <small className="text-xs font-bold text-[#ced4da]">
              This field is optional
            </small>
          )}
        </>
      )}
      name={name as any}
      control={control}
      defaultValue={defaultValue}
    />
  );
};

export default AppTextField;
