"use client";

import { useState } from "react";
import Link from "next/link";
import { useTheme } from "@/app/providers/theme-provider";
import { Button } from "@/components/ui/button";
import { Menu, Moon, Sun, X, Mountain } from "lucide-react";
import { MobileNav } from "./mobile-nav";
import { Navigation } from "./navigation";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link
          href="/"
          className="flex items-center space-x-2 text-2xl font-bold relative group"
        >
          <div className="relative">
            <Mountain
              className="h-6 w-6"
              style={{
                stroke: "url(#gradient)",
              }}
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text [-webkit-background-clip:text] text-transparent transition-all duration-300">
              Misogi
            </span>

            <svg width="0" height="0" aria-hidden="true">
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#a855f7" /> {/* purple-500 */}
                <stop offset="100%" stopColor="#ec4899" /> {/* pink-500 */}
              </linearGradient>
            </svg>
          </div>
        </Link>

        <Navigation className="hidden md:flex" />

        <div className="hidden md:flex items-center space-x-4">
          <Link href="/auth/login">
            <Button
              variant="outline"
              className="dark:border-gray-700 dark:hover:bg-gray-800"
            >
              Log In
            </Button>
          </Link>
          <Link href="/auth/register">
            <Button
              className={`bg-gradient-to-r from-purple-500 to-pink-500 dark:from-purple-400 dark:to-pink-400 text-white hover:opacity-90 transition-opacity`}
            >
              Sign Up
            </Button>
          </Link>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            {theme === "dark" ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>
        </div>

        <button
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </nav>

      {mobileMenuOpen && <MobileNav />}
    </header>
  );
}
