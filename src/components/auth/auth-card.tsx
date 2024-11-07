"use client";

import { Card } from "@/components/ui/card";
import { ArrowLeft, Mountain } from "lucide-react";
import { useTheme } from "@/app/providers/theme-provider";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import Link from "next/link";

interface AuthCardProps {
  children: React.ReactNode;
  headerLabel: string;
}

export const AuthCard = ({ children, headerLabel }: AuthCardProps) => {
  const { theme } = useTheme();

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.indigo.100),white)] dark:bg-[radial-gradient(45rem_50rem_at_top,theme(colors.indigo.900),theme(colors.gray.900))] opacity-50" />

      <Card
        className={`w-full max-w-md p-8 ${
          theme === "dark"
            ? "bg-gray-900/50 border-gray-800"
            : "bg-white/80 border-gray-200"
        } backdrop-blur-sm`}
      >
        <Link href="/">
          <Button variant="ghost">
            <ArrowLeft className="h-4 w-4" />
            Home
          </Button>
        </Link>
        <div className="flex flex-col items-center gap-6">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Mountain className="h-12 w-12 text-purple-500" />
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.3 }}
            className="flex flex-col items-center gap-2"
          >
            <h1 className="text-2xl font-bold">{headerLabel}</h1>
            <p className={theme === "dark" ? "text-gray-400" : "text-gray-500"}>
              Welcome to Misogi
            </p>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.3 }}
            className="w-full"
          >
            {children}
          </motion.div>
        </div>
      </Card>
    </div>
  );
};
