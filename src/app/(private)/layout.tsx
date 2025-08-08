import SidebarLayout from "@/components/appbar/SidebarLayout";
import { primaryMenuItems, secondaryMenuItems } from "@/configs/menuItems";

export default function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarLayout
      primaryMenuItems={primaryMenuItems}
      secondaryMenuItems={secondaryMenuItems}
    >
      {children}
    </SidebarLayout>
  );
}
