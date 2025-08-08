import React from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MailIcon from "@mui/icons-material/Mail";
import LogoutIcon from "@mui/icons-material/Logout";
import { SvgIconComponent } from "@mui/icons-material";

export interface MenuItem {
  text: string;
  icon: SvgIconComponent;
  path: string;
}

export const primaryMenuItems: MenuItem[] = [
  {
    text: "Dashboard",
    icon: DashboardIcon,
    path: "/dashboard",
  },
];

export const secondaryMenuItems: MenuItem[] = [
  {
    text: "Logout",
    icon: LogoutIcon,
    path: "/sign-in",
  },
];
