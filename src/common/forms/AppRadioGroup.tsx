import { FormControl, FormControlLabel, FormHelperText, InputLabel, Radio, RadioGroup, RadioGroupProps } from "@mui/material";
import React from "react";
import { Control, Controller, FieldValues } from "react-hook-form";

type RadioOption = {
  label: string;
  value: string;
};

type RadioGroupPropsExtended = Omit<RadioGroupProps, "control"> & {
  control: Control<FieldValues> | undefined;
  name: string;
  options: RadioOption[];
  defaultValue?: any;
  helperText?: string;
  message?: any;
  header?: string;
};

const AppRadioGroup: React.FC<RadioGroupPropsExtended> = ({
  control,
  name,
  options,
  defaultValue = "",
  helperText = "",
  message,
  header,
  ...props
}) => {
  const hasError = !!message;

  return (
    <FormControl component="fieldset" error={hasError}>
        {header && <InputLabel component="legend">{header}</InputLabel>} 
      <Controller
        render={({ field }) => (
          <RadioGroup {...field} {...props}>
            {options.map((option, index) => (
              <FormControlLabel
                key={index}
                value={option.value}
                control={<Radio />}
                label={option.label}
              />
            ))}
          </RadioGroup>
        )}
        name={name}
        control={control}
        defaultValue={defaultValue}
      />
      {hasError ? <FormHelperText>{message}</FormHelperText> : <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

export default AppRadioGroup;
