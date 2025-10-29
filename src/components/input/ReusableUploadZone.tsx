"use client";

import React, { useState, useEffect } from "react";
import { Box, Typography, IconButton, FormHelperText } from "@mui/material";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import CloseIcon from "@mui/icons-material/Close";
import { Control, Controller } from "react-hook-form";

type FileValue = File | string;

const isImageUrl = (url: string) => {
  return /\.(jpg|jpeg|png|webp|gif|svg)$/i.test(url);
};

interface FileUploadZoneProps {
  field: {
    onChange: (files: FileValue | FileValue[] | null) => void;
    value: FileValue | FileValue[] | null;
    name: string;
  };
  fieldState: {
    error?: {
      message?: string;
    };
  };
  multiple?: boolean;
  accept?: string;
}

const FileUploadZone: React.FC<FileUploadZoneProps> = ({
  field,
  fieldState,
  multiple = false,
  accept = "image/*",
}) => {
  const { onChange, value, name } = field;
  const { error } = fieldState;

  const [previewUrls, setPreviewUrls] = useState<Map<File, string>>(new Map());

  useEffect(() => {
    const newPreviewUrls = new Map<File, string>();
    const files = Array.isArray(value) ? value : value ? [value] : [];

    files.forEach((file) => {
      if (file instanceof File && file.type.startsWith("image/")) {
        const objectUrl = URL.createObjectURL(file);
        newPreviewUrls.set(file, objectUrl);
      }
    });

    setPreviewUrls(newPreviewUrls);

    return () => {
      newPreviewUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [value]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    const newFiles = Array.from(event.target.files);
    if (multiple) {
      const currentFiles = Array.isArray(value) ? value : [];
      onChange([...currentFiles, ...newFiles]);
    } else {
      onChange(newFiles[0] || null);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLElement>) => {
    event.preventDefault();
    if (!event.dataTransfer.files) return;
    const newFiles = Array.from(event.dataTransfer.files);
    if (multiple) {
      const currentFiles = Array.isArray(value) ? value : [];
      onChange([...currentFiles, ...newFiles]);
    } else {
      onChange(newFiles[0] || null);
    }
  };

  const handleClearFile = (
    event: React.MouseEvent,
    fileToRemove: FileValue
  ) => {
    event.preventDefault();
    event.stopPropagation();
    if (multiple && Array.isArray(value)) {
      onChange(value.filter((file) => file !== fileToRemove));
    } else {
      onChange(null);
    }
  };

  const filesArray = Array.isArray(value) ? value : value ? [value] : [];
  const hasFiles = filesArray.length > 0;

  const renderFilePreview = (file: FileValue, index: number) => {
    const isImage =
      (file instanceof File && file.type.startsWith("image/")) ||
      (typeof file === "string" && isImageUrl(file));

    const fileUrl =
      typeof file === "string"
        ? `${process.env.NEXT_PUBLIC_BASIC_URL}/${file}`
        : file instanceof File
        ? previewUrls.get(file)
        : undefined;

    return (
      <Box
        key={typeof file === "string" ? file : file.name + index}
        sx={{
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: multiple ? 120 : 320,
          height: multiple ? 120 : 180,
          borderRadius: 1,
          overflow: "hidden",
          border: "1px solid",
          borderColor: "grey.300",
        }}
      >
        {isImage && fileUrl ? (
          <img
            src={fileUrl}
            alt="Preview"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <Box sx={{ p: 1, textAlign: "center" }}>
            <InsertDriveFileOutlinedIcon sx={{ color: "text.secondary" }} />
            <Typography
              variant="caption"
              display="block"
              sx={{ wordBreak: "break-all" }}
            >
              {file instanceof File ? file.name : file.split("/").pop()}
            </Typography>
          </Box>
        )}
        <IconButton
          size="small"
          onClick={(e) => handleClearFile(e, file)}
          title="Remove file"
          sx={{
            position: "absolute",
            top: 4,
            right: 4,
            backgroundColor: "rgba(255,255,255,0.8)",
            ":hover": { backgroundColor: "rgba(255,255,255,1)" },
          }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>
    );
  };

  return (
    <Box>
      <Box
        component="label"
        htmlFor={hasFiles && !multiple ? undefined : name}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          minHeight: 256,
          border: "2px dashed",
          borderColor: error ? "error.main" : "grey.300",
          borderRadius: 2,
          cursor: hasFiles && !multiple ? "default" : "pointer",
          bgcolor: "grey.50",
          transition: "background-color 0.2s ease-in-out",
          overflow: "hidden",
          ":hover": { bgcolor: hasFiles && !multiple ? "grey.50" : "grey.100" },
          p: 2,
        }}
      >
        <input
          id={name}
          name={name}
          type="file"
          hidden
          onChange={handleFileChange}
          accept={accept}
          multiple={multiple}
        />
        {hasFiles ? (
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 2,
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            {filesArray.map(renderFilePreview)}
            {multiple && (
              <Box
                component="label"
                htmlFor={name}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 120,
                  height: 120,
                  cursor: "pointer",
                }}
              >
                <CloudUploadOutlinedIcon sx={{ color: "grey.500" }} />
                <Typography
                  variant="caption"
                  align="center"
                  sx={{ mt: 1, color: "text.secondary" }}
                >
                  Add more files
                </Typography>
              </Box>
            )}
          </Box>
        ) : (
          <Box sx={{ textAlign: "center", pointerEvents: "none" }}>
            <CloudUploadOutlinedIcon
              sx={{ width: 48, height: 48, mb: 2, color: "grey.500" }}
            />
            <Typography variant="h6" component="p" color="text.secondary">
              <Box
                component="span"
                sx={{ fontWeight: "semibold", color: "primary.main" }}
              >
                Click to upload
              </Box>{" "}
              or drag and drop
            </Typography>
            <Typography variant="caption" color="text.secondary">
              SVG, PNG, JPG or GIF
            </Typography>
          </Box>
        )}
      </Box>
      {error && <FormHelperText error>{error.message}</FormHelperText>}
    </Box>
  );
};

interface ControlledFileUploadZoneProps {
  name: string;
  control: Control<any>;
  multiple?: boolean;
  accept?: string;
}

const ReusableUploadZone: React.FC<ControlledFileUploadZoneProps> = ({
  name,
  control,
  multiple,
  accept,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={multiple ? [] : null}
      render={({ field, fieldState }) => (
        <FileUploadZone
          field={field}
          fieldState={fieldState}
          multiple={multiple}
          accept={accept}
        />
      )}
    />
  );
};

export default ReusableUploadZone;
