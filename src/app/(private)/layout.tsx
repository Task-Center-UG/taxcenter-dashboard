import SidebarLayout from "@/components/appbar/SidebarLayout";
import { sidebarItems } from "@/configs/menuItems";

export default function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <SidebarLayout sidebarItems={sidebarItems}>{children}</SidebarLayout>;
}
