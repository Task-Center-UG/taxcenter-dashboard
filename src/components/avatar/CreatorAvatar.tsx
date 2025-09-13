import { Avatar, Box, Typography } from "@mui/material";

interface CreatorAvatarProps {
  name: string | null | undefined;
  date: string;
  avatarUrl?: string | null;
}

export default function CreatorAvatar({
  name,
  date,
  avatarUrl,
}: CreatorAvatarProps) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 1,
      }}
    >
      <Avatar
        sx={{ width: 24, height: 24, fontSize: 12 }}
        src={avatarUrl || undefined}
      />
      <Box>
        <Typography sx={{ fontSize: 13 }}>{name || "N/A"}</Typography>
        <Typography sx={{ fontSize: 11, color: "gray" }}>{date}</Typography>
      </Box>
    </Box>
  );
}
