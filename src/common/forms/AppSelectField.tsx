import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectProps,
} from "@mui/material";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

type props<TFieldValues extends FieldValues = FieldValues> = SelectProps & {
  control: Control<TFieldValues> | undefined;
  helperText?: string;
  defaultValue?: any;
  name: Path<TFieldValues>;
  id: string;
  message?: any;
  options: { value: any; text: string }[];
};

const AppSelectField = <T extends FieldValues = FieldValues>({
  control,
  message,
  name,
  id,
  options,
  helperText = "",
  defaultValue = "",
  ...props
}: props<T>) => {
  return (
    <Controller
      render={({ field }) => {
        return (
          <FormControl fullWidth>
            {props.label && (
              <InputLabel id={id + "__label"}>{props.label}</InputLabel>
            )}
            <Select
              id={id}
              {...field}
              {...props}
              {...(props.label && {
                labelId: id + "__label",
                label: props.label,
              })}
            >
              {options.map(({ value, text }) => (
                <MenuItem key={value} value={value}>
                  {text}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        );
      }}
      name={name as any}
      control={control}
      defaultValue={defaultValue}
    />
  );
};

export default AppSelectField;
