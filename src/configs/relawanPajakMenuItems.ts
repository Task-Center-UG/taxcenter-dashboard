// src/configs/relawanPajakMenuItems.ts

import React from "react";
import { SvgIconComponent } from "@mui/icons-material";

// Icons
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import LibraryBooksOutlinedIcon from "@mui/icons-material/LibraryBooksOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";

export interface MenuHeader {
  type: "header";
  text: string;
}

export interface MenuItem {
  type: "item";
  text: string;
  icon: SvgIconComponent;
  path?: string;
  children?: MenuItem[];
}

export type SidebarItem = MenuHeader | MenuItem;

export const relawanPajakSidebarItems: SidebarItem[] = [
  {
    type: "item",
    text: "Data Diri",
    icon: PersonOutlinedIcon,
    path: "/relawan-pajak/data-diri",
  },
  {
    type: "item",
    text: "Modul",
    icon: LibraryBooksOutlinedIcon,
    path: "/relawan-pajak/modul",
  },
  {
    type: "item",
    text: "Dokumentasi",
    icon: DescriptionOutlinedIcon,
    path: "/relawan-pajak/dokumentasi",
  },
];
