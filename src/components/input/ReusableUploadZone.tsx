"use client";

import React from "react";
import { Box, Typography, IconButton, FormHelperText } from "@mui/material";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import CloseIcon from "@mui/icons-material/Close";
import { Control, Controller } from "react-hook-form";

interface FileUploadZoneProps {
  field: {
    onChange: (file: File | null) => void;
    value: File | null;
    name: string;
  };
  fieldState: {
    error?: {
      message?: string;
    };
  };
}

const FileUploadZone: React.FC<FileUploadZoneProps> = ({
  field,
  fieldState,
}) => {
  const { onChange, value, name } = field;
  const { error } = fieldState;

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    onChange(file);
  };

  const handleDragOver = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault(); // Necessary to allow dropping
  };

  const handleDrop = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files ? event.dataTransfer.files[0] : null;
    onChange(file);
  };

  const handleClearFile = (event: React.MouseEvent) => {
    event.preventDefault();
    onChange(null);
  };

  return (
    <Box>
      <Box
        component="label"
        htmlFor={name}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: 256, // h-64 equivalent
          border: "2px dashed",
          borderColor: error ? "error.main" : "grey.300",
          borderRadius: 2, // theme.shape.borderRadius * 2
          cursor: "pointer",
          bgcolor: "grey.50",
          transition: "background-color 0.2s ease-in-out",
          ":hover": {
            bgcolor: "grey.100",
          },
        }}
      >
        <input
          id={name}
          name={name}
          type="file"
          hidden
          onChange={handleFileChange}
          accept="image/svg+xml, image/png, image/jpeg, image/gif"
        />
        {value ? (
          <Box sx={{ textAlign: "center" }}>
            <InsertDriveFileOutlinedIcon
              sx={{ fontSize: 48, color: "text.secondary" }}
            />
            <Typography variant="body1" mt={1}>
              {value.name}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              ({(value.size / 1024).toFixed(2)} KB)
            </Typography>
            <IconButton
              size="small"
              onClick={handleClearFile}
              sx={{ position: "absolute", top: 8, right: 8 }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
        ) : (
          // Display when no file is selected
          <Box sx={{ textAlign: "center" }}>
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
              SVG, PNG, JPG or GIF (MAX. 800x400px)
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
}

const ReusableUploadZone: React.FC<ControlledFileUploadZoneProps> = ({
  name,
  control,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={null}
      render={({ field, fieldState }) => (
        <FileUploadZone field={field} fieldState={fieldState} />
      )}
    />
  );
};

export default ReusableUploadZone;
