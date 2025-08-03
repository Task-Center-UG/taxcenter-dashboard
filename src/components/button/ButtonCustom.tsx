import { Button, CircularProgress } from "@mui/material";
import { ReactNode } from "react";
import AddIcon from "@mui/icons-material/Add";
import { useRouter } from "next/navigation";

interface ButtonCustomProps {
  to?: string;
  onClick?: () => void;
  isActive?: boolean;
  label: ReactNode;
  padingX?: number | string;
  padingY?: number | string;
  variant?: "contained" | "outlined" | "text" | "content";
  color?:
    | "primary"
    | "secondary"
    | "error"
    | "success"
    | "info"
    | "warning"
    | "default";
  type?: "button" | "submit" | "reset";
  withPlusIcon?: boolean;
  fullWidth?: boolean;
  isDisabled?: boolean;
  isLoading?: boolean;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  sx?: {
    [key: string]: any;
  };
}

export default function ButtonCustom({
  to,
  onClick,
  isActive = false,
  label,
  padingX = 3,
  padingY = 1.5,
  variant = "contained",
  color = "primary",
  type = "button",
  withPlusIcon = false,
  fullWidth = false,
  isDisabled = false,
  isLoading = false,
  startIcon,
  endIcon,
  sx = {},
}: ButtonCustomProps) {
  const navigate = useRouter();
  const isDefaultColor = color === "default";
  const isContentVariant = variant === "content";
  const muiVariant = isContentVariant ? "text" : variant;

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
    if (to) {
      navigate.push(to);
    }
  };

  const getButtonStyles = () => {
    if (isActive) {
      return {
        backgroundColor: "#E6F3FF",
        "&:hover": {
          backgroundColor: "#FAFCFF",
        },
      };
    }
    return {};
  };

  return (
    <Button
      variant={muiVariant}
      onClick={handleClick}
      type={type}
      endIcon={isLoading ? undefined : endIcon}
      startIcon={isLoading ? undefined : withPlusIcon ? <AddIcon /> : startIcon}
      disabled={isDisabled || isLoading}
      sx={{
        ...getButtonStyles(),
        paddingX: padingX,
        paddingY: padingY,
        width: fullWidth ? "100%" : "fit-content",
        whiteSpace: "nowrap",
        borderRadius: 2,
        ...(isContentVariant && {
          backgroundColor: "#EFF8FF",
          color: "#1570EF",
          "&:hover": {
            backgroundColor: "#dbeffd",
          },
        }),
        ...(isDefaultColor && {
          backgroundColor: variant === "contained" ? "#F3F3FA" : "transparent",
          color: "#000",
          border: variant === "outlined" ? "1px solid #ccc" : "none",
          "&:hover": {
            backgroundColor: variant === "contained" ? "#d5d5d5" : "#f5f5f5",
          },
        }),
        "&.Mui-disabled": {
          ...(color === "primary"
            ? {
                backgroundColor:
                  variant === "contained" ? "#e3f2fd" : "transparent",
                color: "#90caf9",
                border: variant === "outlined" ? "1px solid #90caf9" : "none",
              }
            : {
                backgroundColor:
                  variant === "contained" ? "#e0e0e0" : "transparent",
                color: "#9e9e9e",
                border: variant === "outlined" ? "1px solid #e0e0e0" : "none",
              }),
          cursor: "not-allowed",
          opacity: 0.7,
        },
      }}
      color={isDefaultColor || isContentVariant ? undefined : color}
    >
      {isLoading ? <CircularProgress color="inherit" size={24} /> : label}
    </Button>
  );
}
