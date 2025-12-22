"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { AuthProvider } from "@/hooks/useAuth";
import { NavbarDemo } from "@/components/navbar";
import Footer from "@/components/footer";

export function LayoutShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const disableFooter = ["/Login", "/SignUp", "/Chat"];
  const showFooter = !disableFooter.includes(pathname);

  return (
    <AuthProvider>
      <NavbarDemo />
      <main className="min-h-screen">{children}</main>
      {showFooter && <Footer />}
    </AuthProvider>
  );
}
