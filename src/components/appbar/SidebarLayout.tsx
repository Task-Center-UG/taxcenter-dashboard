"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import Toolbar from "@mui/material/Toolbar";
import Collapse from "@mui/material/Collapse";
import MenuIcon from "@mui/icons-material/Menu";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Image from "next/image";
import { SidebarItem, MenuItem as MenuItemType } from "@/configs/menuItems";
import logoTaxcenter from "@/../public/assets/logo/logo-taxcenter.jpg";
import Cookies from "js-cookie";
import { Stack, Typography } from "@mui/material";
import BaseAvatar from "../avatar/BaseAvatar";
import { useMutation } from "@/hooks/useMutation";

const drawerWidth = 280;

const SidebarMenuItem: React.FC<{ item: MenuItemType }> = ({ item }) => {
  const pathname = usePathname();
  const { children, text, icon, path } = item;
  const hasChildren = children && children.length > 0;

  const isParentActive = hasChildren
    ? children.some((child) => child.path && pathname.startsWith(child.path))
    : false;

  const [open, setOpen] = React.useState(isParentActive);

  const handleToggle = () => {
    setOpen(!open);
  };

  const IconComponent = icon;

  if (hasChildren) {
    return (
      <>
        <ListItemButton onClick={handleToggle}>
          <ListItemIcon>
            <IconComponent />
          </ListItemIcon>
          <ListItemText
            primary={text}
            slotProps={{
              primary: { sx: { fontSize: "0.875rem" } },
            }}
          />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding sx={{ pl: 2 }}>
            {children.map((child) => (
              <SidebarMenuItem key={child.text} item={child} />
            ))}
          </List>
        </Collapse>
      </>
    );
  }

  return (
    <ListItem disablePadding sx={{ display: "block" }}>
      <ListItemButton
        component={Link}
        href={path || "#"}
        selected={pathname === path}
      >
        <ListItemIcon>
          <IconComponent />
        </ListItemIcon>
        <ListItemText
          primary={text}
          slotProps={{
            primary: { sx: { fontSize: "0.875rem" } },
          }}
        />
      </ListItemButton>
    </ListItem>
  );
};

interface AppLayoutProps {
  sidebarItems: SidebarItem[];
  children: React.ReactNode;
  window?: () => Window;
}

export default function SidebarLayout(props: AppLayoutProps) {
  const router = useRouter();
  const { window, children, sidebarItems } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  const { mutate: logout, isMutating: isLoggingOut } = useMutation();

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const handleLogout = async () => {
    const result = await logout("/v1/auth/logout", "POST");

    if (result) {
      router.push("/sign-in");
      router.refresh();
    } else {
      alert("Logout failed. Please try again.");
    }
  };

  const userMenuItems = [
    { label: "Edit Profile", onClick: () => console.log("Editing...") },
    { label: "Logout", onClick: handleLogout },
  ];

  const drawer = (
    <div>
      <Box
        sx={{
          p: 2,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          src={logoTaxcenter}
          alt="Tax Center Logo"
          width={150}
          height={40}
        />
      </Box>
      <Divider sx={{ mb: 2 }} />
      <List sx={{ pt: 0, pb: 2 }}>
        {sidebarItems.map((item) => {
          if (item.type === "header") {
            return (
              <ListSubheader
                key={item.text}
                disableSticky={true}
                sx={{
                  backgroundColor: "transparent",
                  textTransform: "uppercase",
                  fontSize: "0.75rem",
                  fontWeight: "bold",
                  color: "text.secondary",
                  pt: 2,
                  pb: 1,
                }}
              >
                {item.text}
              </ListSubheader>
            );
          }
          return <SidebarMenuItem key={item.text} item={item} />;
        })}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          boxShadow: "none",
          borderBottom: "1px solid",
        }}
      >
        <Toolbar
          sx={{
            backgroundColor: "background.paper",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{
              mr: 2,
              display: { sm: "none" },
              color: "text.primary",
            }}
          >
            <MenuIcon />
          </IconButton>
          <Stack
            direction="row"
            alignItems="center"
            spacing={2}
            sx={{ ml: "auto" }}
          >
            <Box sx={{ display: "flex", gap: 2 }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  textAlign: "right",
                }}
              >
                <Typography
                  sx={{ color: "black", fontSize: 16, fontWeight: 500 }}
                >
                  Super Admin
                </Typography>
                <Typography sx={{ color: "GrayText", fontSize: 14 }}>
                  superadmin@example.com
                </Typography>
              </Box>
              <BaseAvatar
                clickable
                clickMode="dropdown"
                menuItems={userMenuItems}
                imageUrl="/path/to/image.jpg"
              />
            </Box>
          </Stack>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              overflowY: "auto",
              "&::-webkit-scrollbar": {
                width: "6px",
              },
              "&::-webkit-scrollbar-track": {
                backgroundColor: "transparent",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: (theme) => theme.palette.action.disabled,
                borderRadius: "3px",
              },
              "&::-webkit-scrollbar-thumb:hover": {
                backgroundColor: (theme) => theme.palette.action.active,
              },
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              overflowY: "auto",
              "&::-webkit-scrollbar": {
                width: "6px",
              },
              "&::-webkit-scrollbar-track": {
                backgroundColor: "transparent",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: (theme) => theme.palette.action.disabled,
                borderRadius: "3px",
              },
              "&::-webkit-scrollbar-thumb:hover": {
                backgroundColor: (theme) => theme.palette.action.active,
              },
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}
