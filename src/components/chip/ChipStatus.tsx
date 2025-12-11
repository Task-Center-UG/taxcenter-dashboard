import { generateColorFromString } from "./chipStatusColorGenerator";
import { formatText } from "@/utils/useFormatter";
import { Chip } from "@mui/material";
import clsx from "clsx";

const colorClasses = {
  red: "bg-red-100 text-red-800",
  green: "bg-green-100 text-green-800",
  blue: "bg-blue-100 text-blue-800",
  yellow: "bg-yellow-100 text-yellow-800",
  gray: "bg-gray-100 text-gray-800",
};

const statusClasses = {
  active: "bg-green-100 text-green-800",
  // inactive: 'bg-[#FDD9D7] text-[#B71C1C]',
  ended: "bg-gray-100 text-gray-800",
  inactive: "bg-gray-100 text-gray-800",
  "n/a": "bg-gray-100 text-gray-800",
  expired: "bg-gray-100 text-gray-800",
  draft: "bg-yellow-100 text-yellow-800",
  submitted: "bg-blue-100 text-blue-800",

  // attendance
  present: "bg-green-100 text-green-800",
  absent: "bg-red-100 text-red-800",
  "absent with valid reason": "bg-red-100 text-red-800",
  "absent without valid reason": "bg-red-100 text-red-800",
  absent_without_valid_reason: "bg-red-100 text-red-800",
  absent_with_valid_reason: "bg-red-100 text-red-800",

  caregiver: "bg-[#E4F7E1] text-[#1E5C1F]",
  staff: "bg-[#EFF8FF] text-[#175CD3]",

  new: "bg-[#EFF8FF] text-[#175CD3]",
  pending_first_contact: "bg-[#EFF8FF] text-[#175CD3]",
  completed_first_contact_form: "bg-[#EFF8FF] text-[#175CD3]",
  booked: "bg-[#EFF8FF] text-[#175CD3]",
  open: "bg-[#EFF8FF] text-[#175CD3]",
  pending: "bg-[#EFF8FF] text-[#175CD3]",
  deviated: "bg-[#EFF8FF] text-[#175CD3]",
  done: "bg-[#E4F7E1] text-[#1E5C1F]",
  finalized: "bg-[#E4F7E1] text-[#1E5C1F]",
  completed: "bg-[#E4F7E1] text-[#1E5C1F]",
  available: "bg-[#E4F7E1] text-[#1E5C1F]",
  attending: "bg-[#E4F7E1] text-[#1E5C1F]",
  published: "bg-[#E4F7E1] text-[#1E5C1F]",
  approved: "bg-[#E4F7E1] text-[#1E5C1F]",
  paid: "bg-[#E4F7E1] text-[#1E5C1F]",
  sent: "bg-[#FFFAEB] text-[#B54708]",
  "partially paid": "bg-[#E0EAFF] text-[#2D31A6]",
  partially_paid: "bg-[#E0EAFF] text-[#2D31A6]",
  "partially used": "bg-[#E0EAFF] text-[#2D31A6]",
  overdue: "bg-[#FFF1F3] text-[#B71C1C]",
  archived: "bg-[#FFF1F3] text-[#B71C1C]",
  fully_used: "bg-[#E4F7E1] text-[#1E5C1F]",
  "ready to invite": "bg-[#E4F7E1] text-[#1E5C1F]",

  // Form Document Status
  ready_to_sign: "bg-[#FFFAEB] text-[#B54708]",
  pending_manager_acknowledgement: "bg-[#FFFAEB] text-[#B54708]",
  ready: "bg-[#FFFAEB] text-[#B54708]",
  manager_signed: "bg-[#E0EAFF] text-[#2D31A6]",
  pending_supervisor_acknowledgement: "bg-[#E0EAFF] text-[#2D31A6]",
  main_teacher_approved: "bg-[#E0EAFF] text-[#2D31A6]",
  approved_by_case_manager: "bg-[#E0EAFF] text-[#2D31A6]",
  approved_by_supervisor: "bg-[#E0EAFF] text-[#2D31A6]",
  approved_by_caregiver: "bg-[#E0EAFF] text-[#2D31A6]",
  pending_caregiver_approval: "bg-[#E0EAFF] text-[#2D31A6]",
  supervisor_signed: "bg-[#E0EAFF] text-[#2D31A6]",
  sent_to_caregiver: "bg-[#FFFAEB] text-[#B54708]",
  review_requested: "bg-[#F4EBFF] text-[#53389E]",
  sent_to_parent: "bg-[#FFC107]/[.2] text-[#B28600]",
  parent_signed: "bg-[#FFC107]/[.2] text-[#B28600]",

  transferred: "bg-[#E4F7E1] text-[#1E5C1F]",
  rejected: "bg-[#FFF1F3] text-[#B71C1C]",
  rejected_by_supervisor: "bg-[#FFF1F3] text-[#B71C1C]",
  rejected_by_caregiver: "bg-[#FFF1F3] text-[#B71C1C]",
  cancelled: "bg-[#FFF1F3] text-[#B71C1C]",
  voided: "bg-[#FFF1F3] text-[#B71C1C]",
  absent_without_reason: "bg-[#FFF1F3] text-[#B71C1C]",
  absent_with_reason: "bg-[#FFF1F3] text-[#B71C1C]",

  default: "bg-gray-100 text-gray-800",

  // ENROLMENT
  initial_screening: "bg-[#F4EBFF] text-[#53389E]",
  waitlist: "bg-[#CDF4FE] text-[#0278D5]",
  scheduled: "bg-yellow-100 text-yellow-800",
  offered_placement: "bg-[#E0EAFF] text-[#2D31A6]",
  rejected_placement: "bg-[#FDD9D7] text-[#B71C1C]",
  pending_payment: "bg-[#FFF3CD] text-[#B28600]",
  invoice_paid: "bg-[#FFF3CD] text-[#B28600]",
  enrolled: "bg-[#E4F7E1] text-[#1E5C1F]",
  withdrawn: "bg-[#FDD9D7] text-[#B71C1C]",
  attended: "bg-[#E4F7E1] text-[#1E5C1F]",
  responded: "bg-[#E4F7E1] text-[#1E5C1F]",

  // centre
  // 'upper thomson': 'bg-[#F9F5FF] text-[#6941C6]',
  // 'jurong east': 'bg-[#F0F9FF] text-[#026AA2]',
  // wellington: 'bg-[#EEF4FF] text-[#3538CD]',
  // 'bukit batok': 'bg-[#F0F9FF] text-[#026AA2]',

  // medication

  graduated: "bg-[#E4F7E1] text-[#1E5C1F]",
  discharged: "bg-[#E4F7E1] text-[#1E5C1F]",

  submission_approved: "bg-[#E4F7E1] text-[#1E5C1F]",
  withdrawal_rejected: "bg-[#FDD9D7] text-[#B71C1C]",
  withdrawal_approved: "bg-[#E4F7E1] text-[#1E5C1F]",
  submission_rejected: "bg-[#FDD9D7] text-[#B71C1C]",
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
  let displayLabel = props.label; // Nilai default adalah label asli
  if (isWithdrawal && label === "ready") {
    displayLabel = "Request Submitted";
  } else if (label === "finalized") {
    displayLabel = "completed";
  }

  const chipClassName =
    color && colorClasses[color]
      ? colorClasses[color]
      : getStatusClassName(label);

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
