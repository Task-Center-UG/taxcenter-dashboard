# ButtonWithConfirmation Component

Komponen button dengan modal konfirmasi terintegrasi. Mendukung berbagai tema, icon, dan kustomisasi penuh.

## Features

- ✅ Modal konfirmasi sebelum action
- ✅ 5 mode tema: error, warning, info, success, primary
- ✅ Icon default untuk setiap tema (bisa custom)
- ✅ Semua props optional dengan default values
- ✅ Support async operations dengan loading state
- ✅ Full customization untuk button dan dialog

## Quick Start

### 1. Import Component

```tsx
import ButtonWithConfirmation from "@/components/button/ButtonWithConfirmation";
```

### 2. Basic Usage (Minimal Props)

```tsx
<ButtonWithConfirmation label="Delete" onClick={() => console.log("Deleted")} />
```

## Common Use Cases

### Delete Action (Error Theme)

```tsx
<ButtonWithConfirmation
  label="Delete"
  onClick={handleDelete}
  buttonColor="error"
  themeMode="error"
  confirmationTitle="Delete Item"
  confirmationMessage="Are you sure? This cannot be undone."
/>
```

### Approve Action (Success Theme)

```tsx
<ButtonWithConfirmation
  label="Approve"
  onClick={handleApprove}
  buttonColor="success"
  themeMode="success"
  confirmationTitle="Approve Request"
  confirmationMessage="Do you want to approve this request?"
/>
```

### Warning Action (Warning Theme)

```tsx
<ButtonWithConfirmation
  label="Deactivate"
  onClick={handleDeactivate}
  buttonColor="warning"
  themeMode="warning"
  confirmationTitle="Deactivate User"
  confirmationMessage="User will lose access to the system."
/>
```

### With Async Operation

```tsx
const handleDelete = async () => {
  await fetch("/api/delete", { method: "DELETE" });
  // Loading state handled automatically
};

<ButtonWithConfirmation
  label="Delete"
  onClick={handleDelete}
  themeMode="error"
/>;
```

### In Table Actions

```tsx
{
  header: "Action",
  cell: (row) => (
    <ButtonWithConfirmation
      label="Delete"
      onClick={() => handleDelete(row.id)}
      buttonVariant="outlined"
      buttonColor="error"
      themeMode="error"
      buttonStartIcon={<DeleteIcon />}
      confirmationTitle="Delete User"
      confirmationMessage={`Delete ${row.name}?`}
    />
  )
}
```

## All Props

### Button Props

| Prop              | Type                                                                    | Default     | Description                  |
| ----------------- | ----------------------------------------------------------------------- | ----------- | ---------------------------- |
| `label`           | ReactNode                                                               | _required_  | Button text/content          |
| `onClick`         | Function                                                                | _required_  | Action to execute on confirm |
| `buttonVariant`   | "contained" \| "outlined" \| "text"                                     | "contained" | Button style                 |
| `buttonColor`     | "primary" \| "secondary" \| "error" \| "success" \| "info" \| "warning" | "primary"   | Button color                 |
| `buttonDisabled`  | boolean                                                                 | false       | Disable button               |
| `buttonStartIcon` | ReactNode                                                               | undefined   | Icon before label            |
| `buttonEndIcon`   | ReactNode                                                               | undefined   | Icon after label             |
| `buttonFullWidth` | boolean                                                                 | false       | Full width button            |
| `buttonSx`        | object                                                                  | {}          | Custom MUI sx props          |

### Dialog Props

| Prop                  | Type                                                     | Default           | Description                        |
| --------------------- | -------------------------------------------------------- | ----------------- | ---------------------------------- |
| `confirmationTitle`   | string                                                   | "Confirm Action"  | Dialog title                       |
| `confirmationMessage` | ReactNode                                                | "Are you sure..." | Dialog message                     |
| `confirmText`         | string                                                   | "Confirm"         | Confirm button text                |
| `cancelText`          | string                                                   | "Cancel"          | Cancel button text                 |
| `themeMode`           | "error" \| "warning" \| "info" \| "success" \| "primary" | "primary"         | Theme mode (affects icon & color)  |
| `showIcon`            | boolean                                                  | true              | Show/hide icon                     |
| `customIcon`          | ReactNode                                                | undefined         | Custom icon (overrides theme icon) |
| `onCancel`            | Function                                                 | undefined         | Callback when cancelled            |

## Theme Modes & Icons

| Theme Mode | Icon                 | Color  | Use Case                     |
| ---------- | -------------------- | ------ | ---------------------------- |
| `error`    | ⚠️ ErrorOutline      | Red    | Delete, Remove, Destroy      |
| `warning`  | ⚠️ WarningAmber      | Orange | Deactivate, Suspend, Disable |
| `info`     | ℹ️ InfoOutlined      | Blue   | Information, Notify          |
| `success`  | ✓ CheckCircleOutline | Green  | Approve, Accept, Confirm     |
| `primary`  | ? HelpOutline        | Blue   | General confirmation         |

## Advanced Examples

### Custom Icon & Styling

```tsx
<ButtonWithConfirmation
  label="Block User"
  onClick={handleBlock}
  customIcon={<BlockIcon sx={{ fontSize: 60 }} />}
  buttonSx={{
    backgroundColor: "#ff5722",
    "&:hover": { backgroundColor: "#e64a19" },
  }}
  themeMode="error"
/>
```

### Without Icon

```tsx
<ButtonWithConfirmation
  label="Submit"
  onClick={handleSubmit}
  showIcon={false}
  confirmationTitle="Submit Form"
/>
```

### With Cancel Callback

```tsx
<ButtonWithConfirmation
  label="Delete"
  onClick={handleDelete}
  onCancel={() => console.log("Cancelled")}
  themeMode="error"
/>
```

## Tips

1. **Theme mode** menentukan icon dan warna dialog (bukan button)
2. **Button color** dan **theme mode** bisa berbeda untuk fleksibilitas
3. Async operations automatically show loading state
4. Semua props optional kecuali `label` dan `onClick`
5. Modal otomatis close setelah confirm atau cancel
