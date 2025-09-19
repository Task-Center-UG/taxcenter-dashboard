"use client";

import { Box, CircularProgress, Typography } from "@mui/material";
import React from "react";

interface LoaderProps {
  message?: string;
}

const Loader: React.FC<LoaderProps> = ({ message }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        gap: 2,
        width: "100%",
        height: "100%",
      }}
    >
      <CircularProgress />
      <Typography variant="body1" color="text.secondary">
        {message || "Loading initial data..."}
      </Typography>
    </Box>
  );
};

export default Loader;
