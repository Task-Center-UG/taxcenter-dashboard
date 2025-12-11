"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { getRole } from "@/utils/roleManager";

interface RoleGuardProps {
  children: React.ReactNode;
}

export default function RoleGuard({ children }: RoleGuardProps) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const role = getRole();

    // Skip for public routes
    if (
      pathname.startsWith("/sign-in") ||
      pathname.startsWith("/forgot-password")
    ) {
      return;
    }

    // Check if user has role set
    if (!role) {
      return; // Let middleware handle redirect to sign-in
    }

    // Admin trying to access Tax Volunteer pages
    if (role === "Admin" && pathname.startsWith("/relawan-pajak")) {
      router.replace("/dashboard");
      return;
    }

    // Tax Volunteer trying to access Admin pages (private routes)
    if (role === "Tax Volunteer" && !pathname.startsWith("/relawan-pajak")) {
      router.replace("/relawan-pajak/data-diri");
      return;
    }
  }, [pathname, router]);

  return <>{children}</>;
}
