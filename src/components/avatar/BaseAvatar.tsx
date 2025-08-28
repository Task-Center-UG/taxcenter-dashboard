"use client";

import {
  Box,
  Typography,
  Avatar,
  Skeleton,
  Menu,
  MenuItem,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface MenuItem {
  label: string;
  onClick: () => void;
}

interface Props {
  imageUrl?: string;
  title?: string;
  subtitle?: string;
  isLoading?: boolean;
  size?: "small" | "medium" | "large";
  clickable?: boolean;
  onClick?: () => void;
  clickMode?: "dropdown" | "navigate";
  href?: string;
  menuItems?: MenuItem[];
}

const styles = {
  large: {
    height: 80,
    avatar: {
      width: 80,
      height: 80,
    },
    skeleton: {
      titleFontSize: "1.5rem",
      subtitleFontSize: "1rem",
    },
  },
  medium: {
    height: 64,
    avatar: {
      width: 64,
      height: 64,
    },
    skeleton: {
      titleFontSize: "1.25rem",
      subtitleFontSize: "0.875rem",
    },
  },
  small: {
    height: 40,
    avatar: {
      width: 40,
      height: 40,
    },
    skeleton: {
      titleFontSize: "1rem",
      subtitleFontSize: "0.75rem",
    },
  },
};

const BaseAvatar = (props: Props) => {
  const {
    imageUrl,
    title,
    subtitle,
    isLoading,
    size = "small",
    clickable = false,
    onClick,
    clickMode,
    href,
    menuItems = [],
  } = props;
  const router = useRouter();
  const firstLetter = title ? title.charAt(0).toUpperCase() : "";
  const style = styles[size];

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isDropdownOpen = Boolean(anchorEl);

  const titleStyles = {
    fontWeight: clickable ? "bold" : "normal",
    ...(clickable && {
      color: "primary.main",
      cursor: "pointer",
      "&:hover": {
        textDecoration: "underline",
      },
    }),
  };

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!clickable) return;

    if (clickMode === "navigate" && href) {
      router.push(href);
    } else if (clickMode === "dropdown") {
      setAnchorEl(event.currentTarget);
    } else if (onClick) {
      onClick();
    }
  };

  const handleDropdownClose = () => {
    setAnchorEl(null);
  };

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", alignItems: "center" }}>
        {/* Skeleton for the Avatar is now dynamic */}
        <Skeleton
          variant="circular"
          sx={{ width: style.avatar.width, height: style.avatar.height }}
        />
        <Box sx={{ ml: 2, width: "100%" }}>
          {/* Skeletons for the text are now dynamic */}
          <Skeleton
            variant="text"
            sx={{ fontSize: style.skeleton.titleFontSize, width: "40%" }}
          />
          <Skeleton
            variant="text"
            sx={{ fontSize: style.skeleton.subtitleFontSize, width: "80%" }}
          />
        </Box>
      </Box>
    );
  }

  return (
    <>
      <Box
        className="flex items-center"
        onClick={handleClick}
        sx={{ cursor: clickable ? "pointer" : "default" }}
      >
        {imageUrl ? (
          // If the image URL exists, show the image Avatar
          <Avatar
            src={imageUrl}
            sx={{
              ...style.avatar,
              "& .MuiAvatar-img": {
                imageRendering: "high-quality",
              },
            }}
          />
        ) : (
          // If the image URL is null or empty, show the text Avatar
          <Avatar sx={{ ...style.avatar }}>{firstLetter}</Avatar>
        )}
        <Box className="ml-2">
          <Typography component="div" className="font-bold" sx={titleStyles}>
            {title}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {subtitle}
          </Typography>
        </Box>
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={isDropdownOpen}
        onClose={handleDropdownClose}
        slotProps={{
          list: { "aria-labelledby": "basic-button" },
        }}
      >
        {menuItems.map((item) => (
          <MenuItem
            key={item.label}
            onClick={() => {
              handleDropdownClose();
              item.onClick();
            }}
            sx={{ py: 2 }}
          >
            <Typography variant="body2" textAlign={"left"} paddingRight={8}>
              {item.label}
            </Typography>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default BaseAvatar;
