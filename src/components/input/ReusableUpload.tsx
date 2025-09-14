import React, { useRef, useMemo, useEffect } from "react";
import { Controller, Control, FieldValues, Path } from "react-hook-form";
import {
  Box,
  Button,
  Avatar,
  Typography,
  Stack,
  FormControl,
  FormHelperText,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import ButtonCustom from "../button/ButtonCustom";

export interface ImageUploadProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  defaultPreview?: string;
  avatarSize?: number;
  disabled?: boolean;
}

export const ReusableUpload = <T extends FieldValues>({
  name,
  control,
  label,
  defaultPreview = "",
  avatarSize = 90,
  disabled = false,
}: ImageUploadProps<T>) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        const previewUrl = useMemo(() => {
          if (
            value &&
            typeof value === "object" &&
            (value as any) instanceof File
          ) {
            return URL.createObjectURL(value as File);
          }
          return value || defaultPreview;
        }, [value, defaultPreview]);

        useEffect(() => {
          return () => {
            if (
              previewUrl &&
              value &&
              typeof value === "object" &&
              (value as any) instanceof File
            ) {
              URL.revokeObjectURL(previewUrl);
            }
          };
        }, [previewUrl, value]);

        const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const file = e.target.files?.[0] || null;
          onChange(file);
        };

        const handleRemoveImage = () => {
          onChange(null);
          if (inputRef.current) {
            inputRef.current.value = "";
          }
        };

        return (
          <FormControl fullWidth error={!!error}>
            {label && (
              <Typography variant="body1" sx={{ mb: 1, fontWeight: 500 }}>
                {label}
              </Typography>
            )}
            <Stack direction="row" alignItems="center" spacing={3}>
              <Avatar
                src={previewUrl}
                sx={{
                  width: avatarSize,
                  height: avatarSize,
                  bgcolor: "action.hover",
                  border: `2px dashed ${error ? "red" : "transparent"}`,
                }}
              >
                {!previewUrl && (
                  <PersonIcon sx={{ fontSize: avatarSize * 0.5 }} />
                )}
              </Avatar>

              <Stack spacing={1}>
                <input
                  type="file"
                  accept="image/*"
                  ref={inputRef}
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                />
                <ButtonCustom
                  label="Choose Image"
                  color="default"
                  startIcon={<UploadFileIcon />}
                  onClick={() => inputRef.current?.click()}
                />

                {value && (
                  <Button
                    size="small"
                    color="error"
                    variant="text"
                    onClick={handleRemoveImage}
                    disabled={disabled}
                    sx={{ alignSelf: "flex-start" }}
                  >
                    Remove
                  </Button>
                )}
              </Stack>
            </Stack>
            {error && <FormHelperText>{error.message}</FormHelperText>}
          </FormControl>
        );
      }}
    />
  );
};
