import { ThemeProvider } from "./providers/theme-provider";
import "./globals.css";
import CustomSessionProvider from "./providers/session-provider";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";

export const metadata = {
  title: "Misogi - Visualize Your Life's Journey",
  description:
    "Transform your life with Misogi. Track your progress, set ambitious goals, and conquer MISOGI challenges.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="es">
      <body>
        <CustomSessionProvider session={session}>
          <ThemeProvider>{children}</ThemeProvider>
        </CustomSessionProvider>
      </body>
    </html>
  );
}
