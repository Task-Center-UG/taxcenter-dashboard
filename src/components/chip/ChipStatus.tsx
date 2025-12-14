import { generateColorFromString } from "./chipStatusColorGenerator";
import { formatText } from "@/utils/useFormatter";
import { Chip } from "@mui/material";
import clsx from "clsx";

const colorClasses = {
  red: "!bg-red-100 !text-red-800",
  green: "!bg-green-100 !text-green-800",
  blue: "!bg-blue-100 !text-blue-800",
  yellow: "!bg-yellow-100 !text-yellow-800",
  gray: "!bg-gray-100 !text-gray-800",
};

const statusClasses = {
  pending: "!bg-blue-100 !text-blue-800",
  diterima: "!bg-green-100 !text-green-800",
  active: "!bg-green-100 !text-green-800",
};

const getStatusClassName = (status: string) => {
  const lowerCase = status.toLowerCase();
  if (lowerCase in statusClasses) {
    return statusClasses[lowerCase as keyof typeof statusClasses];
  }
  return generateColorFromString(status);
};

interface ChipStatusProps {
  label: string;
  className?: string;
  hidden?: boolean;
  color?: "red" | "green" | "blue" | "yellow" | "gray";
  isWithdrawal?: boolean;
  chipSize?: string;
}

const ChipStatus = (props: ChipStatusProps) => {
  const { className, color, isWithdrawal, chipSize = "small" } = props;

  const label = String(props.label || "default").toLowerCase();
  let displayLabel = props.label;
  if (isWithdrawal && label === "ready") {
    displayLabel = "Request Submitted";
  } else if (label === "finalized") {
    displayLabel = "completed";
  }

  console.log("label chip status:", label);
  console.log("displayLabel chip status:", displayLabel);

  // Priority: 1. Explicit color prop, 2. Status-based classes, 3. Generated color
  const chipClassName =
    color && colorClasses[color]
      ? colorClasses[color]
      : label in statusClasses
      ? statusClasses[label as keyof typeof statusClasses]
      : generateColorFromString(label);

  return (
    <Chip
      size={chipSize as any}
      sx={{ fontWeight: "500", width: "fit-content" }}
      label={formatText(displayLabel)}
      className={clsx("", chipClassName, className)}
      hidden={props.hidden}
    />
  );
};

export default ChipStatus;
