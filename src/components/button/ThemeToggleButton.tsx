"use client";

import { useContext } from "react";
import { Fab, useTheme } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { ColorModeContext } from "@/context/ThemeContext";

export default function ThemeToggleButton() {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  return (
    <Fab
      color="primary"
      aria-label="toggle theme"
      onClick={colorMode.toggleColorMode}
      sx={{
        position: "fixed",
        bottom: 16,
        right: 16,
      }}
    >
      {theme.palette.mode === "dark" ? (
        <Brightness7Icon />
      ) : (
        <Brightness4Icon />
      )}
    </Fab>
  );
}
