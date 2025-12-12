/**
 * ButtonWithConfirmation Component - Usage Examples
 *
 * This file demonstrates various ways to use the ButtonWithConfirmation component
 */

import ButtonWithConfirmation from "@/components/button/ButtonWithConfirmation";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import BlockIcon from "@mui/icons-material/Block";

// ========================================
// Example 1: Basic Usage (Default Settings)
// ========================================
export function BasicExample() {
  const handleDelete = () => {
    console.log("Item deleted");
    // Your delete logic here
  };

  return <ButtonWithConfirmation label="Delete" onClick={handleDelete} />;
}

// ========================================
// Example 2: Error Theme (Delete Action)
// ========================================
export function DeleteExample() {
  const handleDelete = async () => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Item deleted successfully");
  };

  return (
    <ButtonWithConfirmation
      label="Delete Item"
      onClick={handleDelete}
      buttonVariant="contained"
      buttonColor="error"
      buttonStartIcon={<DeleteIcon />}
      themeMode="error"
      confirmationTitle="Delete Confirmation"
      confirmationMessage="Are you sure you want to delete this item? This action cannot be undone."
      confirmText="Delete"
      cancelText="Cancel"
    />
  );
}

// ========================================
// Example 3: Warning Theme (Deactivate Action)
// ========================================
export function DeactivateExample() {
  const handleDeactivate = () => {
    console.log("User deactivated");
  };

  return (
    <ButtonWithConfirmation
      label="Deactivate User"
      onClick={handleDeactivate}
      buttonVariant="outlined"
      buttonColor="warning"
      themeMode="warning"
      confirmationTitle="Deactivate User"
      confirmationMessage="This user will lose access to the system. You can reactivate them later."
      confirmText="Deactivate"
      cancelText="Keep Active"
    />
  );
}

// ========================================
// Example 4: Success Theme (Approve Action)
// ========================================
export function ApproveExample() {
  const handleApprove = async () => {
    // API call to approve
    await fetch("/api/approve", { method: "POST" });
    console.log("Approved successfully");
  };

  return (
    <ButtonWithConfirmation
      label="Approve"
      onClick={handleApprove}
      buttonVariant="contained"
      buttonColor="success"
      buttonStartIcon={<CheckIcon />}
      themeMode="success"
      confirmationTitle="Approve Request"
      confirmationMessage="Do you want to approve this request?"
      confirmText="Yes, Approve"
      cancelText="No, Cancel"
    />
  );
}

// ========================================
// Example 5: Info Theme (Send Notification)
// ========================================
export function SendNotificationExample() {
  const handleSendNotification = () => {
    console.log("Notification sent");
  };

  return (
    <ButtonWithConfirmation
      label="Send Notification"
      onClick={handleSendNotification}
      buttonVariant="contained"
      buttonColor="info"
      themeMode="info"
      confirmationTitle="Send Notification"
      confirmationMessage="This will send notifications to all selected users."
      confirmText="Send"
      cancelText="Cancel"
    />
  );
}

// ========================================
// Example 6: Custom Icon
// ========================================
export function CustomIconExample() {
  const handleBlock = () => {
    console.log("User blocked");
  };

  return (
    <ButtonWithConfirmation
      label="Block User"
      onClick={handleBlock}
      buttonVariant="contained"
      buttonColor="error"
      themeMode="error"
      customIcon={<BlockIcon sx={{ fontSize: 60 }} />}
      confirmationTitle="Block User"
      confirmationMessage="This user will be permanently blocked from accessing the system."
      confirmText="Block"
      cancelText="Cancel"
    />
  );
}

// ========================================
// Example 7: Without Icon
// ========================================
export function NoIconExample() {
  const handleSubmit = () => {
    console.log("Form submitted");
  };

  return (
    <ButtonWithConfirmation
      label="Submit Form"
      onClick={handleSubmit}
      showIcon={false}
      confirmationTitle="Submit Confirmation"
      confirmationMessage="Please review your information before submitting."
      confirmText="Submit"
      cancelText="Review Again"
    />
  );
}

// ========================================
// Example 8: Full Width Button
// ========================================
export function FullWidthExample() {
  const handleConfirm = () => {
    console.log("Confirmed");
  };

  return (
    <ButtonWithConfirmation
      label="Confirm Payment"
      onClick={handleConfirm}
      buttonFullWidth={true}
      buttonVariant="contained"
      buttonColor="primary"
      themeMode="success"
      confirmationTitle="Confirm Payment"
      confirmationMessage="You are about to make a payment of $100.00"
      confirmText="Pay Now"
      cancelText="Cancel"
    />
  );
}

// ========================================
// Example 9: With Custom Styling
// ========================================
export function CustomStyleExample() {
  const handleAction = () => {
    console.log("Custom action executed");
  };

  return (
    <ButtonWithConfirmation
      label="Custom Action"
      onClick={handleAction}
      buttonSx={{
        backgroundColor: "#6366f1",
        "&:hover": {
          backgroundColor: "#4f46e5",
        },
        borderRadius: 2,
        paddingX: 4,
        paddingY: 1.5,
      }}
      themeMode="primary"
      confirmationTitle="Execute Action"
      confirmationMessage="This is a custom styled button with confirmation."
    />
  );
}

// ========================================
// Example 10: With onCancel Callback
// ========================================
export function WithCancelCallbackExample() {
  const handleDelete = () => {
    console.log("Delete confirmed");
  };

  const handleCancel = () => {
    console.log("User cancelled the action");
  };

  return (
    <ButtonWithConfirmation
      label="Delete with Callback"
      onClick={handleDelete}
      onCancel={handleCancel}
      buttonColor="error"
      themeMode="error"
      confirmationTitle="Delete Confirmation"
      confirmationMessage="Are you sure?"
    />
  );
}

// ========================================
// Example 11: In a Table Action (Practical Use Case)
// ========================================
export function TableActionExample({ userId }: { userId: string }) {
  const handleDeleteUser = async () => {
    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        console.log("User deleted successfully");
        // Refresh table or update state
      }
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };

  return (
    <ButtonWithConfirmation
      label="Delete"
      onClick={handleDeleteUser}
      buttonVariant="outlined"
      buttonColor="error"
      buttonStartIcon={<DeleteIcon />}
      buttonSx={{ minWidth: 80 }}
      themeMode="error"
      confirmationTitle="Delete User"
      confirmationMessage="Are you sure you want to delete this user? This action cannot be undone."
      confirmText="Delete"
      cancelText="Cancel"
    />
  );
}

// ========================================
// Example 12: Multiple Buttons Side by Side
// ========================================
export function MultipleButtonsExample({ requestId }: { requestId: string }) {
  const handleApprove = async () => {
    await fetch(`/api/requests/${requestId}/approve`, { method: "POST" });
    console.log("Request approved");
  };

  const handleReject = async () => {
    await fetch(`/api/requests/${requestId}/reject`, { method: "POST" });
    console.log("Request rejected");
  };

  return (
    <div style={{ display: "flex", gap: "8px" }}>
      <ButtonWithConfirmation
        label="Approve"
        onClick={handleApprove}
        buttonColor="success"
        themeMode="success"
        confirmationTitle="Approve Request"
        confirmationMessage="Do you want to approve this request?"
        confirmText="Approve"
      />

      <ButtonWithConfirmation
        label="Reject"
        onClick={handleReject}
        buttonColor="error"
        buttonVariant="outlined"
        themeMode="error"
        confirmationTitle="Reject Request"
        confirmationMessage="Are you sure you want to reject this request?"
        confirmText="Reject"
      />
    </div>
  );
}
