import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  InputLabel,
} from "@mui/material";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

type CheckboxOption = {
  label: string;
  value: string;
};

type CheckboxGroupProps<TFieldValues extends FieldValues = FieldValues> = {
  control: Control<TFieldValues> | undefined;
  name: Path<TFieldValues>;
  options: CheckboxOption[];
  defaultValue?: string[];
  helperText?: string;
  message?: any;
  row?: boolean; // Add row prop to handle layout direction
  singleSelection?: boolean; // New prop to allow single selection
  header?: string; // New prop for the header text
};

const AppCheckboxGroup = <T extends FieldValues = FieldValues>({
  control,
  name,
  options,
  defaultValue = [],
  helperText = "",
  message,
  row = false,
  singleSelection = false,
  header,
}: CheckboxGroupProps<T>) => {
  const hasError = !!message;

  return (
    <FormControl component="fieldset" error={hasError}>
      {header && <InputLabel component="legend">{header}</InputLabel>}
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue as any}
        render={({ field }) => (
          <FormGroup row={row}>
            {options.map((option, index) => (
              <FormControlLabel
                key={index}
                control={
                  <Checkbox
                    checked={
                      singleSelection
                        ? field.value === option.value // Single selection logic
                        : field.value.includes(option.value) // Multiple selection logic
                    }
                    onChange={(e) => {
                      if (singleSelection) {
                        // For single selection, set the value directly
                        field.onChange(e.target.checked ? option.value : "");
                      } else {
                        // For multiple selection, handle array of values
                        const newValue = e.target.checked
                          ? [...field.value, option.value]
                          : field.value.filter(
                              (value: string) => value !== option.value,
                            );
                        field.onChange(newValue);
                      }
                    }}
                  />
                }
                label={option.label}
              />
            ))}
          </FormGroup>
        )}
      />
      {hasError ? (
        <FormHelperText>{message}</FormHelperText>
      ) : (
        <FormHelperText>{helperText}</FormHelperText>
      )}
    </FormControl>
  );
};

export default AppCheckboxGroup;
