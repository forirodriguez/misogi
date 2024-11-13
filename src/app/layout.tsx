import { ThemeProvider } from "./providers/theme-provider";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers/session-provider";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Misogi - Visualize Your Life's Journey",
  description:
    "Transform your life with Misogi. Track your progress, set ambitious goals, and conquer MISOGI challenges.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <ThemeProvider>{children}</ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
