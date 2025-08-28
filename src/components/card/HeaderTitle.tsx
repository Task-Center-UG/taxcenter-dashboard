import { Box, Typography } from "@mui/material";
import React, { ReactNode } from "react";

interface FormTitleProps {
  children: React.ReactNode;
  actionButtons?: ReactNode[];
}

const HeaderTitle = ({ children, actionButtons }: FormTitleProps) => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",

      backgroundColor: "#E7F1FF",
      py: 1,
      px: 2,
      borderTopLeftRadius: 8,
      borderTopRightRadius: 8,
    }}
  >
    <Typography
      sx={{
        fontWeight: "bold",
        fontSize: "16px",
        color: "#053E89",
      }}
    >
      {children}
    </Typography>
    {actionButtons && (
      <Box sx={{ display: "flex", justifyContent: "center", gap: 1 }}>
        {actionButtons.map((button, index) => (
          <React.Fragment key={index}>{button}</React.Fragment>
        ))}
      </Box>
    )}
  </Box>
);

export const FormTitleText = ({ children }: { children: React.ReactNode }) => (
  <Typography
    sx={{
      fontWeight: "bold",
      fontSize: "16px",
      color: "#053E89",
    }}
  >
    {children}
  </Typography>
);

export default HeaderTitle;
