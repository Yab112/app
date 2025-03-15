"use client";

import {Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes"; 

export function DarkModeToggle() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className="flex items-center gap-2 cursor-pointer">
      <button
        onClick={() => setTheme(isDark ? "light" : "dark")}
        aria-label="Toggle Dark Mode"
        className="flex items-center justify-center p-2 rounded-full bg-gray-200 dark:bg-gray-800 cursor-pointer"
      >
        {isDark ? <Sun className="text-yellow-500" /> : <Moon className="text-blue-500" />}
      </button>
    </div>
  );
}
