import SidebarLayout from "@/components/appbar/SidebarLayout";
import { relawanPajakSidebarItems } from "@/configs/relawanPajakMenuItems";

export default function RelawanPajakLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarLayout sidebarItems={relawanPajakSidebarItems}>
      {children}
    </SidebarLayout>
  );
}
