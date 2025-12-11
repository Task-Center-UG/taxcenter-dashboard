import { ReactNode, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
  Typography,
} from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

type ThemeMode = "error" | "warning" | "info" | "success" | "primary";

interface ButtonWithConfirmationProps {
  // Button props
  label: ReactNode;
  onClick: () => void | Promise<void>;
  buttonVariant?: "contained" | "outlined" | "text";
  buttonColor?:
    | "primary"
    | "secondary"
    | "error"
    | "success"
    | "info"
    | "warning";
  buttonDisabled?: boolean;
  buttonStartIcon?: ReactNode;
  buttonEndIcon?: ReactNode;
  buttonFullWidth?: boolean;
  buttonSx?: object;

  // Confirmation dialog props
  confirmationTitle?: string;
  confirmationMessage?: ReactNode;
  confirmText?: string;
  cancelText?: string;
  themeMode?: ThemeMode;
  showIcon?: boolean;
  customIcon?: ReactNode;
  onCancel?: () => void;
}

const defaultIcons: Record<ThemeMode, ReactNode> = {
  error: <ErrorOutlineIcon sx={{ fontSize: 48 }} />,
  warning: <WarningAmberIcon sx={{ fontSize: 48 }} />,
  info: <InfoOutlinedIcon sx={{ fontSize: 48 }} />,
  success: <CheckCircleOutlineIcon sx={{ fontSize: 48 }} />,
  primary: <HelpOutlineIcon sx={{ fontSize: 48 }} />,
};

const iconColors: Record<ThemeMode, string> = {
  error: "#d32f2f",
  warning: "#ed6c02",
  info: "#0288d1",
  success: "#2e7d32",
  primary: "#1976d2",
};

export default function ButtonWithConfirmation({
  // Button props
  label,
  onClick,
  buttonVariant = "contained",
  buttonColor = "primary",
  buttonDisabled = false,
  buttonStartIcon,
  buttonEndIcon,
  buttonFullWidth = false,
  buttonSx = {},

  // Confirmation dialog props
  confirmationTitle = "Confirm Action",
  confirmationMessage = "Are you sure you want to proceed with this action?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  themeMode = "primary",
  showIcon = true,
  customIcon,
  onCancel,
}: ButtonWithConfirmationProps) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
    if (onCancel) {
      onCancel();
    }
  };

  const handleConfirm = async () => {
    setIsLoading(true);
    try {
      await onClick();
      setOpen(false);
    } catch (error) {
      console.error("Error in confirmation action:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const iconToDisplay = customIcon || defaultIcons[themeMode];
  const iconColor = iconColors[themeMode];

  return (
    <>
      <Button
        variant={buttonVariant}
        color={buttonColor}
        onClick={handleOpenDialog}
        disabled={buttonDisabled}
        startIcon={buttonStartIcon}
        endIcon={buttonEndIcon}
        fullWidth={buttonFullWidth}
        sx={{
          paddingX: 3,
          paddingY: 1,
          borderRadius: 3,
          whiteSpace: "nowrap",
          ...buttonSx,
        }}
      >
        {label}
      </Button>

      <Dialog
        open={open}
        onClose={handleCloseDialog}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 2,
            padding: 1,
          },
        }}
      >
        <DialogTitle sx={{ textAlign: "center", paddingTop: 3 }}>
          {showIcon && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                marginBottom: 2,
                color: iconColor,
              }}
            >
              {iconToDisplay}
            </Box>
          )}
          <Typography variant="h6" component="div" fontWeight="600">
            {confirmationTitle}
          </Typography>
        </DialogTitle>

        <DialogContent>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ textAlign: "center" }}
          >
            {confirmationMessage}
          </Typography>
        </DialogContent>

        <DialogActions
          sx={{
            padding: "8px 24px 24px",
            justifyContent: "center",
            gap: 1,
          }}
        >
          <Button
            onClick={handleCloseDialog}
            variant="outlined"
            disabled={isLoading}
            sx={{ minWidth: 100 }}
          >
            {cancelText}
          </Button>
          <Button
            onClick={handleConfirm}
            variant="contained"
            color={themeMode === "primary" ? buttonColor : (themeMode as any)}
            disabled={isLoading}
            sx={{ minWidth: 100 }}
          >
            {isLoading ? "Processing..." : confirmText}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
