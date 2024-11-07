"use client";

import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function DashboardPage() {
  const session = useSession();
  console.log(session);

  return (
    <div className="container mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold mb-2">
                Welcome to your Dashboard
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                {session?.data?.user?.name || session?.data?.user?.email}
              </p>
            </div>
            <Button
              variant="outline"
              onClick={() => signOut({ callbackUrl: "/" })}
            >
              Sign Out
            </Button>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {/* User Info Card */}
            <Card className="p-6 bg-white dark:bg-gray-800">
              <h3 className="font-semibold mb-2">User Information</h3>
              <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                {/*  <p>Email: {session?.data?.user?.email}</p>
                <p>Name: {session?.data?.user?.name || "Not provided"}</p>
                {session?.data?.provider && (
                  <p>Provider: {session.data.provider}</p>
                )} */}
              </div>
            </Card>

            {/* Authentication Status Card */}
            <Card className="p-6 bg-white dark:bg-gray-800">
              <h3 className="font-semibold mb-2">Authentication Status</h3>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full" />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Authenticated
                </span>
              </div>
            </Card>

            {/* Session Info Card */}
            <Card className="p-6 bg-white dark:bg-gray-800">
              <h3 className="font-semibold mb-2">Session Details</h3>
              <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                {/*  <p>ID: {session?.data?.user?.id}</p> */}
                <p>Status: Active</p>
              </div>
            </Card>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
