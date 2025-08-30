"use client";

import React from "react";
import {
  FormControl,
  Typography,
  TextField,
  FormHelperText,
  Theme,
} from "@mui/material";
import { Control, Controller, FieldErrors, FieldError } from "react-hook-form";

// Helper function remains the same
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
  type?: string;
  [key: string]: any;
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
  disabled = false,
  ...rest
}: ReusableInputProps) => {
  const showAsterisk = isRequired && !!label;
  const error = getNestedError({ errors, path: name });
  const errorMessage = error?.message;

  const handleSx = (theme: Theme) => ({
    backgroundColor:
      theme.palette.mode === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[700],
    borderRadius: "8px",
    "& .MuiOutlinedInput-root": {
      borderRadius: "8px",
      fontSize: "0.875rem",
      color: theme.palette.text.primary,
      "& .MuiOutlinedInput-notchedOutline": {
        // Change this line to a darker grey
        borderColor:
          theme.palette.mode === "light"
            ? theme.palette.grey[400] // Changed from grey[300] to grey[400]
            : theme.palette.grey[600],
      },
      "&:hover .MuiOutlinedInput-notchedOutline": {
        borderColor: theme.palette.primary.light,
      },
      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: theme.palette.primary.main,
        borderWidth: "1px",
      },
    },
    "& .MuiInputBase-input": {
      padding: "12px 14px",
      borderRadius: "8px",
    },
    "& .MuiInputBase-input::placeholder": {
      color:
        theme.palette.mode === "dark" ? theme.palette.grey[400] : undefined,
      opacity: 0.5,
    },
    "& .Mui-disabled": {
      backgroundColor:
        theme.palette.mode === "light"
          ? theme.palette.grey[100]
          : theme.palette.grey[800],
    },
  });

  return (
    <FormControl variant="outlined" fullWidth size="small" error={!!error}>
      {label && (
        <Typography
          sx={{
            display: "block",
            mb: 1,
            fontSize: "1rem",
            fontWeight: 500,
            color: "text.primary",
          }}
        >
          {label} {showAsterisk && <span style={{ color: "red" }}>*</span>}
        </Typography>
      )}
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <TextField
            {...rest}
            {...field}
            fullWidth
            disabled={disabled}
            placeholder={placeholder}
            type={type}
            id={`${name}`}
            multiline={multiline}
            rows={multiline ? rows : 1}
            sx={handleSx}
          />
        )}
      />
      {description && (
        <FormHelperText
          sx={{ color: "text.secondary", mx: 0, mt: 1, fontSize: "14px" }}
        >
          {description}
        </FormHelperText>
      )}
      {errorMessage && (
        <FormHelperText sx={{ mx: 0, mt: 1, color: "error.main" }}>
          {String(errorMessage)}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default ReusableInput;
