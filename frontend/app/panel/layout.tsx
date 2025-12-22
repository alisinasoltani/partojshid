'use client'

import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from '@/components/PanelSidebar';
import { useEffect, useState } from 'react';

export default function PanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // این حالت باعث می‌شه فقط در کلاینت رندر بشه و hydration mismatch نداشته باشیم
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // در SSR فقط یک placeholder خالی یا skeleton رندر می‌کنیم
    return (
      <div className="flex min-h-screen w-full">
        <div className="w-64 border-r bg-gray-50" /> {/* placeholder برای sidebar */}
        <main className="flex-1 p-8">{children}</main>
      </div>
    );
  }

  // بعد از mount شدن در کلاینت، sidebar واقعی رو نشون می‌دیم
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <main className="flex-1 w-full h-full p-8 overflow-auto">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}