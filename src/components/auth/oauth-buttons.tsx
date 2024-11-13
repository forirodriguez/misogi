"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Loader2 } from "lucide-react";

export const OAuthButtons = () => {
  const [isLoading, setIsLoading] = useState<string | null>(null);

  const handleOAuthSignIn = async (provider: "google" | "github") => {
    try {
      setIsLoading(provider);
      await signIn(provider, {
        callbackUrl: "/dashboard",
      });
    } catch (error) {
      console.error("OAuth error:", error);
    } finally {
      setIsLoading(null);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <Button
        variant="outline"
        onClick={() => handleOAuthSignIn("google")}
        disabled={!!isLoading}
        className="flex items-center justify-center gap-2"
      >
        {isLoading === "google" ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          <FcGoogle className="h-5 w-5" />
        )}
        Continue with Google
      </Button>

      <Button
        variant="outline"
        onClick={() => handleOAuthSignIn("github")}
        disabled={!!isLoading}
        className="flex items-center justify-center gap-2"
      >
        {isLoading === "github" ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          <FaGithub className="h-5 w-5" />
        )}
        Continue with GitHub
      </Button>
    </div>
  );
};
