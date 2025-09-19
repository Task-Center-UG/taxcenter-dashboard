"use client";

import React from "react";
import {
  FormControl,
  Typography,
  Select,
  MenuItem,
  Chip,
  Box,
  OutlinedInput,
  SelectChangeEvent,
  Tooltip,
  Skeleton,
  FormHelperText,
  Theme,
} from "@mui/material";
import {
  Control,
  Controller,
  FieldErrors,
  useFormContext,
  FieldError,
} from "react-hook-form";
import InfoOutlineIcon from "@mui/icons-material/InfoOutlined";

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

export interface Option {
  value: string | number | boolean;
  label: string;
}
interface ReusableSelectProps {
  name: string;
  label?: string;
  control?: Control<any>;
  errors?: FieldErrors;
  options: Option[];
  placeholder?: string;
  selectWidth?: string;
  multiple?: boolean;
  isControl?: boolean;
  value?: string | number | (string | number)[];
  defaultValue?: string | number | (string | number)[];
  onChange?: (event: SelectChangeEvent<any>, child: React.ReactNode) => void;
  tooltip?: string;
  disabled?: boolean;
  isRequired?: boolean;
  isLoading?: boolean;
  onClick?: (value: any) => void;
  onValueChange?: (value: any) => void;
  [key: string]: any;
}

const ReusableSelect = ({
  name,
  label,
  control,
  errors,
  options,
  placeholder,
  selectWidth = "100%",
  multiple = false,
  fullWidth = true,
  isControl = true,
  value: standardValue,
  defaultValue,
  onChange: standardOnChange,
  tooltip,
  onClick,
  isLoading = false,
  onValueChange,
  disabled = false,
  isRequired = true,
  ...rest
}: ReusableSelectProps) => {
  const formContext = useFormContext();
  const formDisabled = formContext?.formState?.disabled || false;
  const isDisabled = disabled || formDisabled;
  const showAsterisk = isRequired && !!label;

  // MUI styling function
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
        borderColor:
          theme.palette.mode === "light"
            ? theme.palette.grey[300]
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
    "& .MuiSelect-select": {
      padding: "12px 14px",
      borderRadius: "8px",
      minHeight: "10px",
    },
    "& .Mui-disabled": {
      backgroundColor:
        theme.palette.mode === "light"
          ? theme.palette.grey[100]
          : theme.palette.grey[800],
      cursor: "not-allowed",
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor:
          theme.palette.mode === "light"
            ? theme.palette.grey[200]
            : theme.palette.grey[700],
      },
    },
    "& .MuiInputBase-input::placeholder": {
      color:
        theme.palette.mode === "dark" ? theme.palette.grey[400] : undefined,
      opacity: 0.5,
    },
  });

  const renderSelect = (
    fieldValue: any,
    onChange: (...event: any[]) => void,
    hasError: boolean = false
  ) => {
    const effectiveValue = fieldValue !== undefined ? fieldValue : defaultValue;

    const handleChipDelete = (valueToDelete: string | number) => {
      if (multiple) {
        const currentValues = (effectiveValue || []) as (string | number)[];
        const newValue = currentValues.filter((item) => item !== valueToDelete);
        onChange(newValue);
      }
    };

    return (
      <Select
        name={name}
        value={multiple ? effectiveValue || [] : effectiveValue ?? ""}
        onChange={(event) => {
          const newValue = event.target.value;
          onChange(newValue);
          if (onValueChange) {
            onValueChange(newValue);
          }
          if (onClick) {
            onClick(newValue);
          }
        }}
        labelId={`select-${name}-label`}
        id={`select-${name}`}
        multiple={multiple}
        disabled={isDisabled}
        displayEmpty
        error={hasError}
        input={<OutlinedInput />}
        inputProps={{
          "aria-invalid": hasError,
        }}
        sx={handleSx}
        MenuProps={{
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "left",
          },
          transformOrigin: {
            vertical: "top",
            horizontal: "left",
          },
          PaperProps: {
            style: {
              maxHeight: 250,
            },
          },
        }}
        renderValue={(selectedValue) => {
          if (multiple) {
            const values = selectedValue as (string | number)[];
            if (!values || values.length === 0) {
              return (
                <Typography sx={{ color: "text.secondary", opacity: 0.5 }}>
                  {placeholder}
                </Typography>
              );
            }
            return (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {values.map((value) => {
                  const selectedOption = options.find(
                    (opt) => opt.value === value
                  );
                  return (
                    <Chip
                      key={value}
                      label={selectedOption ? selectedOption.label : value}
                      size="small"
                      onDelete={(e) => {
                        e.stopPropagation();
                        handleChipDelete(value);
                      }}
                      onMouseDown={(e) => e.stopPropagation()}
                      sx={{
                        backgroundColor: (theme) =>
                          theme.palette.mode === "light"
                            ? theme.palette.grey[100]
                            : theme.palette.grey[600],
                        border: "1px solid",
                        borderColor: (theme) =>
                          theme.palette.mode === "light"
                            ? theme.palette.grey[300]
                            : theme.palette.grey[500],
                        height: 24,
                        "& .MuiChip-deleteIcon": { fontSize: 16 },
                      }}
                    />
                  );
                })}
              </Box>
            );
          }
          if (
            selectedValue === "" ||
            selectedValue === null ||
            selectedValue === undefined
          ) {
            return (
              <Typography sx={{ color: "text.secondary", opacity: 0.5 }}>
                {placeholder}
              </Typography>
            );
          }
          const selectedOption = options.find(
            (opt) => opt.value === selectedValue
          );
          return selectedOption ? selectedOption.label : "";
        }}
        {...rest}
      >
        {options.map((option) => (
          <MenuItem
            key={String(option.value)}
            value={option.value as unknown as string | number}
          >
            {option.label}
          </MenuItem>
        ))}
      </Select>
    );
  };

  const getErrorMessage = (errorObject: FieldErrors, fieldName: string) => {
    const errorField = getNestedError({ errors: errorObject, path: fieldName });
    return errorField ? errorField.message : null;
  };

  if (isLoading) {
    return (
      <FormControl fullWidth={fullWidth} sx={{ width: selectWidth }}>
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
            <Skeleton variant="text" width="40%" />
          </Typography>
        )}
        <Skeleton
          variant="rectangular"
          height={44}
          sx={{ borderRadius: "8px" }}
        />
      </FormControl>
    );
  }

  return (
    <>
      {isControl && control ? (
        <Controller
          name={name}
          control={control}
          defaultValue={defaultValue}
          render={({ field, fieldState: { error } }) => (
            <FormControl
              variant="outlined"
              fullWidth={fullWidth}
              sx={{ width: selectWidth }}
              size="small"
              error={!!error}
            >
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
                  {label}{" "}
                  {showAsterisk && <span style={{ color: "red" }}>*</span>}
                  {tooltip && (
                    <Tooltip title={tooltip} placement="top" sx={{ ml: 0.5 }}>
                      <InfoOutlineIcon
                        sx={{ color: (theme) => theme.palette.info.main }}
                        fontSize="small"
                      />
                    </Tooltip>
                  )}
                </Typography>
              )}
              {renderSelect(field.value, field.onChange, !!error)}
              {error?.message && (
                <FormHelperText sx={{ mx: 0, mt: 1, color: "error.main" }}>
                  {String(error.message)}
                </FormHelperText>
              )}
            </FormControl>
          )}
        />
      ) : (
        <FormControl
          variant="outlined"
          fullWidth={fullWidth}
          sx={{ width: selectWidth }}
          size="small"
          error={!!(errors && getErrorMessage(errors, name))}
        >
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
              {tooltip && (
                <Tooltip title={tooltip} placement="top" sx={{ ml: 0.5 }}>
                  <InfoOutlineIcon
                    sx={{ color: (theme) => theme.palette.info.main }}
                    fontSize="small"
                  />
                </Tooltip>
              )}
            </Typography>
          )}
          {renderSelect(
            standardValue,
            standardOnChange as any,
            !!(errors && getErrorMessage(errors, name))
          )}
          {errors && getErrorMessage(errors, name) && (
            <FormHelperText sx={{ mx: 0, mt: 1, color: "error.main" }}>
              {getErrorMessage(errors, name)}
            </FormHelperText>
          )}
        </FormControl>
      )}
    </>
  );
};

export default ReusableSelect;
