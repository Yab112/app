"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export function DarkModeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch by ensuring this runs only on the client
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // Avoid mismatch during SSR

  return (
    <div className="flex items-center gap-2">
      <Label htmlFor="dark-mode" className="sr-only">
        Dark Mode
      </Label>
      <Switch
        id="dark-mode"
        checked={theme === "dark"}
        onCheckedChange={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="data-[state=checked]:bg-blue-600"
      />
      <span className="text-sm hidden md:inline">Dark Mode</span>
    </div>
  );
}
