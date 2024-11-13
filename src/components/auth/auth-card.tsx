"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mountain, ArrowLeft } from "lucide-react";
import { useTheme } from "@/app/providers/theme-provider";
import { motion } from "framer-motion";
import Link from "next/link";

interface AuthCardProps {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
}

export const AuthCard = ({
  children,
  headerLabel,
  backButtonLabel,
  backButtonHref,
}: AuthCardProps) => {
  const { theme } = useTheme();

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.indigo.100),white)] dark:bg-[radial-gradient(45rem_50rem_at_top,theme(colors.indigo.900),theme(colors.gray.900))] opacity-50" />

      <div className="w-full max-w-md">
        {/* Back button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-4"
        >
          <Link href={backButtonHref}>
            <Button
              variant="ghost"
              className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
            >
              <ArrowLeft className="h-4 w-4" />
              {backButtonLabel}
            </Button>
          </Link>
        </motion.div>

        {/* Main card */}
        <Card
          className={`w-full p-8 ${
            theme === "dark"
              ? "bg-gray-900/50 border-gray-800"
              : "bg-white/80 border-gray-200"
          } backdrop-blur-sm`}
        >
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
              <p
                className={theme === "dark" ? "text-gray-400" : "text-gray-500"}
              >
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
    </div>
  );
};
