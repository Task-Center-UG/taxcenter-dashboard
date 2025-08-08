import React from "react";
import {
  FormControl,
  Typography,
  TextField,
  FormHelperText,
} from "@mui/material";
import { Control, Controller, FieldErrors, FieldError } from "react-hook-form";

interface GetNestedErrorProps {
  errors: FieldErrors;
  path: string;
}

const getNestedError = ({
  errors,
  path,
}: GetNestedErrorProps): FieldError | undefined => {
  const pathParts = path.split(/[.[\]]+/).filter(Boolean);
  let current: any = errors;
  for (const part of pathParts) {
    if (!current) return undefined;
    current = current[part];
  }
  return current as FieldError | undefined;
};

interface ReusableInputProps {
  name: string;
  label?: string;
  control?: Control<any>;
  errors: FieldErrors;
  multiline?: boolean;
  rows?: number;
  isRequired?: boolean;
  placeholder?: string;
  disabled?: boolean;
  description?: string;
  selectWidth?: string;
  [key: string]: any;
  type?: string;
}

const ReusableInput = ({
  name,
  label,
  control,
  placeholder = "",
  errors,
  type = "text",
  multiline = false,
  rows = 4,
  isRequired = true,
  description,
  selectWidth = "100%",
  disabled = false,
  ...rest
}: ReusableInputProps) => {
  const showAsterisk = isRequired && !!label;
  const error = getNestedError({ errors, path: name });
  const errorMessage = error?.message;

  return (
    <FormControl variant="outlined" fullWidth size="small" error={!!error}>
      {label && (
        <Typography className="text-lg/tight mb-2">
          {label} {showAsterisk && <span className="text-red-600">*</span>}
        </Typography>
      )}
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <TextField
            {...rest}
            {...field}
            disabled={disabled}
            placeholder={placeholder}
            type={type}
            {...field}
            id={`${name}`}
            multiline={multiline}
            rows={multiline ? rows : 1}
            sx={{
              backgroundColor: "background.paper",
              width: selectWidth,
              cursor: disabled ? "not-allowed" : "pointer",
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
                backgroundColor: "background.paper",
                minHeight: multiline ? 56 : 44,
                padding: "6px 0px",
                color: disabled ? "#9CA3AF" : "inherit", // Gray text when disabled
              },
              "& .MuiInputBase-inputMultiline": {
                lineHeight: 1.5,
                fontSize: 14,
              },
            }}
            {...rest}
          />
        )}
      />
      {description && (
        <FormHelperText
          sx={{ color: "#667085", mx: 0, mt: 1, fontSize: "14px" }}
        >
          {description}
        </FormHelperText>
      )}
      {errorMessage && (
        <FormHelperText className="mx-0 mt-1">
          <span className="text-red-600">{errorMessage.toString()}</span>
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default ReusableInput;
