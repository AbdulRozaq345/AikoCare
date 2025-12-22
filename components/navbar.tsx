"use client";

import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { useMemo, useState } from "react";
import { useAuth } from "@/hooks/useAuth";

export function NavbarDemo() {
  const { user, logout } = useAuth();

  const navItems = [
    { name: "Beranda", link: "/#beranda" },
    { name: "Konsultasi", link: "/Konsultasi" },
    { name: "Info", link: "/#info" },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // TERAPKAN PERUBAHAN DI SINI:
  // Menggunakan optional chaining agar Navbar langsung berubah saat user terisi
  const userName = (user as any)?.name || null;

  const avatarUrl = useMemo(() => {
    if (!userName) return null;

    // Jika ada foto profil dari backend, gunakan itu
    if ((user as any)?.profile_photo_url) return (user as any).profile_photo_url;
    if ((user as any)?.avatar) return (user as any).avatar;

    // Fallback ke inisial nama
    const initials = encodeURIComponent(userName);
    return `https://ui-avatars.com/api/?name=${initials}&background=0D8ABC&color=fff`;
  }, [user, userName]);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout gagal:', error);
    }
  };

  return (
    <div className="relative w-full">
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} />
          
          <div className="flex items-center gap-4">
            {userName ? (
              <>
                <a
                  href="/"
                  className="flex items-center gap-3 rounded-full border border-slate-200 bg-white/80 px-3 py-1 shadow-sm transition hover:shadow-md"
                >
                  <img
                    src={avatarUrl || ""}
                    alt={userName}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                  <span className="hidden md:block text-sm font-medium text-slate-700">
                    {userName}
                  </span>
                </a>
<button
  type="button"
  onClick={(e) => {
    e.preventDefault(); // Mencegah bubbling event
    void handleLogout();
  }}
  className="relative z-50 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 shadow-sm transition hover:bg-slate-50 active:scale-95"
>
  Logout
</button>
              </>
            ) : (
              <NavbarButton href="/Login" variant="primary">
                Login
              </NavbarButton>
            )}
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item, idx) => (
              <a
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-2 text-neutral-600"
              >
                {item.name}
              </a>
            ))}
            
            <div className="mt-4 border-t pt-4">
              {userName ? (
                <div className="flex flex-col gap-3">
                  <a href="/dashboard" className="flex items-center gap-3">
                    <img src={avatarUrl || ""} className="h-10 w-10 rounded-full" alt={userName} />
                    <span className="font-semibold">{userName}</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      void handleLogout();
                    }}
                    className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 shadow-sm"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <NavbarButton href="/Login" variant="primary" className="w-full">
                  Login
                </NavbarButton>
              )}
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
      
    </div>
  );
}