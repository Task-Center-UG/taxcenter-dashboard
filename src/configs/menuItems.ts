// src/configs/menuItems.ts

import React from "react";
import { SvgIconComponent } from "@mui/icons-material";

// Icons
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import ViewCarouselOutlinedIcon from "@mui/icons-material/ViewCarouselOutlined";
import ApartmentOutlinedIcon from "@mui/icons-material/ApartmentOutlined";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import AccountTreeOutlinedIcon from "@mui/icons-material/AccountTreeOutlined";
import HandshakeOutlinedIcon from "@mui/icons-material/HandshakeOutlined";
import Diversity3OutlinedIcon from "@mui/icons-material/Diversity3Outlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import SupervisedUserCircleOutlinedIcon from "@mui/icons-material/SupervisedUserCircleOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import ModelTrainingOutlinedIcon from "@mui/icons-material/ModelTrainingOutlined";
import ScienceOutlinedIcon from "@mui/icons-material/ScienceOutlined";
import LocalHospitalOutlinedIcon from "@mui/icons-material/LocalHospitalOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import EventNoteOutlinedIcon from "@mui/icons-material/EventNoteOutlined";
import NewspaperOutlinedIcon from "@mui/icons-material/NewspaperOutlined";
import LibraryBooksOutlinedIcon from "@mui/icons-material/LibraryBooksOutlined";
import OndemandVideoOutlinedIcon from "@mui/icons-material/OndemandVideoOutlined";
import MicOutlinedIcon from "@mui/icons-material/MicOutlined";
import PhotoCameraBackOutlinedIcon from "@mui/icons-material/PhotoCameraBackOutlined";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";

// This is a type for a section header (e.g., "BERANDA")
export interface MenuHeader {
  type: "header";
  text: string;
}

// Updated MenuItem to support nesting
export interface MenuItem {
  type: "item";
  text: string;
  icon: SvgIconComponent;
  path?: string; // Optional: A parent might not have a direct path
  children?: MenuItem[];
}

export type SidebarItem = MenuHeader | MenuItem;

export const sidebarItems: SidebarItem[] = [
  {
    type: "item",
    text: "Dashboard",
    icon: DashboardOutlinedIcon,
    path: "/dashboard",
  },
  { type: "header", text: "BERANDA" },
  {
    type: "item",
    text: "Hero Slider",
    icon: ViewCarouselOutlinedIcon,
    path: "/beranda/hero-slider",
  },
  {
    type: "item",
    text: "Company Profile",
    icon: ApartmentOutlinedIcon,
    path: "/beranda/company-profile",
  },
  {
    type: "item",
    text: "Penghargaan",
    icon: EmojiEventsOutlinedIcon,
    path: "/beranda/penghargaan",
  },
  { type: "header", text: "TENTANG KAMI" },
  {
    type: "item",
    text: "Struktur Organisasi",
    icon: AccountTreeOutlinedIcon,
    children: [
      {
        type: "item",
        text: "Struktur",
        icon: AccountTreeOutlinedIcon,
        path: "/tentang-kami/struktur-organisasi",
      },
      {
        type: "item",
        text: "Divisi",
        icon: Diversity3OutlinedIcon,
        path: "/tentang-kami/divisi",
      },
    ],
  },
  {
    type: "item",
    text: "Mitra Kerja Sama",
    icon: HandshakeOutlinedIcon,
    path: "/tentang-kami/mitra",
  },
  { type: "header", text: "PROGRAM DAN LAYANAN" },
  {
    type: "item",
    text: "Relawan Pajak",
    icon: SupervisedUserCircleOutlinedIcon,
    children: [
      {
        type: "item",
        text: "Module",
        icon: LibraryBooksOutlinedIcon,
        path: "/program/relawan-pajak/module",
      },
      {
        type: "item",
        text: "Dokumentasi",
        icon: DescriptionOutlinedIcon,
        path: "/program/relawan-pajak/dokumentasi",
      },
      {
        type: "item",
        text: "Pengguna Relawan Pajak",
        icon: ManageAccountsOutlinedIcon,
        path: "/program/relawan-pajak/pengguna",
      },
    ],
  },
  {
    type: "item",
    text: "Pengabdian Masyarakat",
    icon: GroupsOutlinedIcon,
    children: [
      {
        type: "item",
        text: "Pendampingan UMKM",
        icon: StorefrontOutlinedIcon,
        path: "/program/pengabdian/pendampingan-umkm",
      },
      {
        type: "item",
        text: "Pelatihan/Workshop UMKM",
        icon: ModelTrainingOutlinedIcon,
        path: "/program/pengabdian/pelatihan-umkm",
      },
      {
        type: "item",
        text: "Foto Produk UMKM",
        icon: PhotoCameraBackOutlinedIcon,
        path: "/program/pengabdian/foto-produk-umkm",
      },
    ],
  },
  {
    type: "item",
    text: "Riset",
    icon: ScienceOutlinedIcon,
    children: [
      {
        type: "item",
        text: "Kategori Penelitian",
        icon: ScienceOutlinedIcon,
        path: "/program/riset/kategori",
      },
      {
        type: "item",
        text: "Kerja Sama Riset",
        icon: HandshakeOutlinedIcon,
        path: "/program/riset/kerja-sama",
      },
      {
        type: "item",
        text: "Program dan Kegiatan Riset",
        icon: EventNoteOutlinedIcon,
        path: "/program/riset/program-kegiatan",
      },
    ],
  },
  {
    type: "item",
    text: "Tax Clinic",
    icon: LocalHospitalOutlinedIcon,
    children: [
      {
        type: "item",
        text: "Informasi dan Edukasi",
        icon: SchoolOutlinedIcon,
        path: "/program/tax-clinic/info-edukasi",
      },
    ],
  },
  {
    type: "item",
    text: "Inklusi Pajak",
    icon: SchoolOutlinedIcon,
    children: [
      {
        type: "item",
        text: "Mata Kuliah Wajib Umum",
        icon: LibraryBooksOutlinedIcon,
        path: "/program/inklusi-pajak/mkwu",
      },
    ],
  },
  { type: "header", text: "KEGIATAN DAN BERITA" },
  {
    type: "item",
    text: "Agenda Kegiatan",
    icon: EventNoteOutlinedIcon,
    children: [
      {
        type: "item",
        text: "Slider",
        icon: ViewCarouselOutlinedIcon,
        path: "/kegiatan/agenda/slider",
      },
      {
        type: "item",
        text: "Kegiatan Terbaru",
        icon: EventNoteOutlinedIcon,
        path: "/kegiatan/agenda/terbaru",
      },
    ],
  },
  {
    type: "item",
    text: "Artikel Pajak",
    icon: NewspaperOutlinedIcon,
    path: "/kegiatan/artikel",
  },
  {
    type: "item",
    text: "Publikasi",
    icon: DescriptionOutlinedIcon,
    path: "/kegiatan/publikasi",
  },
  { type: "header", text: "EDUKASI PAJAK" },
  {
    type: "item",
    text: "Materi Pajak",
    icon: LibraryBooksOutlinedIcon,
    path: "/edukasi/materi",
  },
  {
    type: "item",
    text: "Bincang Sore & Podcast",
    icon: MicOutlinedIcon,
    path: "/edukasi/podcast",
  },
  {
    type: "item",
    text: "Video Pembelajaran Pajak",
    icon: OndemandVideoOutlinedIcon,
    path: "/edukasi/video",
  },
  { type: "header", text: "GALERI" },
  {
    type: "item",
    text: "Foto Kegiatan",
    icon: PhotoCameraBackOutlinedIcon,
    path: "/galeri/foto-kegiatan",
  },
  { type: "header", text: "LAINNYA" },
  {
    type: "item",
    text: "Kelola Pengguna",
    icon: ManageAccountsOutlinedIcon,
    path: "/kelola-pengguna",
  },
];
