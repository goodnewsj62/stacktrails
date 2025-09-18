"use client";
import { Button, IconButton } from "@mui/material";
import React, { useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { FiCheck, FiEdit, FiPlus, FiX } from "react-icons/fi";
import AppTextField from "./AppTextField";

type StringArrayInputProps = {
  name: string;
  label?: string;
};

const StringArrayInput: React.FC<StringArrayInputProps> = ({ name, label }) => {
  const { control, getValues } = useFormContext();
  const { fields, append, remove, update } = useFieldArray({
    control,
    name,
  });

  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editValue, setEditValue] = useState("");

  const handleAdd = () => {
    append(""); // add empty string
    setEditIndex(fields.length);
    setEditValue("");
  };

  const handleUpdate = (index: number) => {
    if (editValue.trim() !== "") {
      update(index, editValue.trim());
    }
    setEditIndex(null);
    setEditValue("");
  };

  console.log(fields.map((w) => w));

  return (
    <div className="w-full">
      <div className="my-4 flex justify-end">
        <Button
          variant="contained"
          color="primary"
          startIcon={<FiPlus />}
          onClick={handleAdd}
        >
          {label || "Add Item"}
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:gap-8">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="flex items-center gap-2  p-1  bg-base  rounded-lg"
          >
            <IconButton
              color="error"
              size="small"
              onClick={() => remove(index)}
            >
              <FiX />
            </IconButton>
            {editIndex === index ? (
              <>
                {/* Editable text field (not RHF controlled while editing) */}
                <IconButton
                  color="primary"
                  size="small"
                  onClick={() => handleUpdate(index)}
                >
                  <FiCheck />
                </IconButton>

                <input
                  className="flex-1 rounded border border-primary px-2 py-1 text-sm h-full min-h-[55px] bg-background"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  placeholder={`Item ${index + 1}`}
                />
              </>
            ) : (
              <>
                {/* Display mode: RHF controlled TextField */}
                <IconButton
                  color="secondary"
                  size="small"
                  onClick={() => {
                    setEditIndex(index);
                    // Get the current value from the form state
                    const currentValues = getValues(name);
                    setEditValue(currentValues[index] || "");
                  }}
                >
                  <FiEdit />
                </IconButton>
                <AppTextField
                  control={control}
                  name={`${name}.${index}`}
                  className="bg-white w-full"
                  disabled
                />
                {/* <Controller
                  control={control}
                  name={`${name}.${index}`}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label={`Item ${index + 1}`}
                      fullWidth
                      disabled
                      className="b"
                    />
                  )}
                /> */}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StringArrayInput;
