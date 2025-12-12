"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { getRole } from "@/utils/roleManager";

interface RoleGuardProps {
  children: React.ReactNode;
}

export default function RoleGuard({ children }: RoleGuardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkRole = () => {
      const role = getRole();

      // Skip for public routes
      if (
        pathname.startsWith("/sign-in") ||
        pathname.startsWith("/forgot-password")
      ) {
        setIsChecking(false);
        return;
      }

      // Check if user has role set
      if (!role) {
        setIsChecking(false);
        return; // Let middleware handle redirect to sign-in
      }

      // Admin trying to access Tax Volunteer pages
      if (role === "Admin" && pathname.startsWith("/relawan-pajak")) {
        router.replace("/dashboard");
        return; // Don't set isChecking to false, keep loading during redirect
      }

      // Tax Volunteer trying to access Admin pages (private routes)
      if (role === "Tax Volunteer" && !pathname.startsWith("/relawan-pajak")) {
        router.replace("/relawan-pajak/data-diri");
        return; // Don't set isChecking to false, keep loading during redirect
      }

      // Role check passed, show content
      setIsChecking(false);
    };

    checkRole();
  }, [pathname, router]);

  // Show nothing during role check for protected routes
  if (isChecking) {
    return null;
  }

  return <>{children}</>;
}
