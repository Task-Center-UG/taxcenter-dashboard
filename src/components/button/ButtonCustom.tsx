import { Button, CircularProgress } from "@mui/material";
import { ReactNode, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { useRouter } from "next/navigation";
import ConfirmationDialog from "../confirmation/ConfirmationDialog";

interface ConfirmationOptions {
  title: string;
  message: ReactNode;
  confirmText?: string;
  cancelText?: string;
  confirmColor?: "primary" | "secondary" | "error" | "success";
}

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
  sx?: object;
  withConfirmation?: ConfirmationOptions;
}

export default function ButtonCustom({
  to,
  onClick,
  isActive = false,
  label,
  padingX = 3,
  padingY = 1,
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
  withConfirmation,
}: ButtonCustomProps) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isDefaultColor = color === "default";
  const isContentVariant = variant === "content";
  const muiVariant = isContentVariant ? "text" : variant;

  const handlePrimaryAction = () => {
    if (onClick) {
      onClick();
    }
    if (to) {
      router.push(to);
    }
  };

  const handleButtonClick = () => {
    if (withConfirmation) {
      setIsModalOpen(true);
    } else {
      handlePrimaryAction();
    }
  };

  const handleConfirm = () => {
    setIsModalOpen(false);
    handlePrimaryAction();
  };

  const finalStartIcon = isLoading ? null : withPlusIcon ? (
    <AddIcon />
  ) : (
    startIcon
  );
  const finalEndIcon = isLoading ? null : endIcon;

  return (
    <>
      <Button
        variant={muiVariant}
        onClick={handleButtonClick}
        type={type}
        startIcon={finalStartIcon}
        endIcon={finalEndIcon}
        disabled={isDisabled || isLoading}
        sx={{
          paddingX: padingX,
          paddingY: padingY,
          width: fullWidth ? "100%" : "fit-content",
          whiteSpace: "nowrap",
          borderRadius: 3,
          ...(isActive && {
            backgroundColor: "#E6F3FF",
            "&:hover": { backgroundColor: "#FAFCFF" },
          }),
          ...(isContentVariant && {
            backgroundColor: "#EFF8FF",
            color: "#1570EF",
            "&:hover": { backgroundColor: "#dbeffd" },
          }),
          ...(isDefaultColor && {
            backgroundColor:
              variant === "contained" ? "#F3F3FA" : "transparent",
            color: "#000",
            border: variant === "outlined" ? "1px solid #ccc" : "none",
            "&:hover": {
              backgroundColor: variant === "contained" ? "#d5d5d5" : "#f5f5f5",
            },
          }),
          "&.Mui-disabled": {
            backgroundColor:
              variant === "contained"
                ? color === "primary"
                  ? "#e3f2fd"
                  : "#e0e0e0"
                : "transparent",
            color: color === "primary" ? "#90caf9" : "#9e9e9e",
            border:
              variant === "outlined"
                ? `1px solid ${color === "primary" ? "#90caf9" : "#e0e0e0"}`
                : "none",
            cursor: "not-allowed",
            opacity: 0.7,
          },
          ...sx,
        }}
        color={isDefaultColor || isContentVariant ? undefined : color}
      >
        {isLoading ? <CircularProgress color="inherit" size={24} /> : label}
      </Button>

      {withConfirmation && (
        <ConfirmationDialog
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleConfirm}
          title={withConfirmation.title}
          message={withConfirmation.message}
          confirmText={withConfirmation.confirmText}
          cancelText={withConfirmation.cancelText}
          confirmColor={withConfirmation.confirmColor}
        />
      )}
    </>
  );
}
