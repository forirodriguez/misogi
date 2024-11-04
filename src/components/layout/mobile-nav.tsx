"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/app/providers/theme-provider";
import { Moon, Sun, Mountain } from "lucide-react";

const navLinks = [
  { href: "#features", label: "Features" },
  { href: "#timeline", label: "Timeline" },
  { href: "#challenge", label: "MISOGI Challenge" },
  { href: "#pricing", label: "Pricing" },
];

export function MobileNav() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="md:hidden bg-white dark:bg-gray-800 py-4">
      <div className="container mx-auto px-4 flex flex-col space-y-4">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="hover:text-purple-500 transition-colors flex items-center space-x-2"
          >
            {link.href === "#challenge" && <Mountain className="w-4 h-4" />}
            <span>{link.label}</span>
          </Link>
        ))}
        <Button variant="outline" className="w-full">
          Log In
        </Button>
        <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white">
          Sign Up
        </Button>
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 self-start"
        >
          {theme === "dark" ? (
            <Sun className="w-5 h-5" />
          ) : (
            <Moon className="w-5 h-5" />
          )}
        </button>
      </div>
    </div>
  );
}
