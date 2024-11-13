// app/auth/login/page.tsx
import { Metadata } from "next";
import { AuthCard } from "@/components/auth/auth-card";
import { LoginForm } from "@/components/auth/login-form";
import { OAuthButtons } from "@/components/auth/oauth-buttons";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Sign In | Misogi",
  description: "Sign in to your Misogi account",
};

export default async function LoginPage() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/");
  }

  return (
    <AuthCard
      headerLabel="Welcome Back"
      backButtonLabel="Back to home"
      backButtonHref="/"
    >
      <div className="flex flex-col gap-6">
        <LoginForm />
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-gray-300 dark:border-gray-700" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white dark:bg-gray-900 px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>
        <OAuthButtons />
      </div>
    </AuthCard>
  );
}
