// app/page.tsx
import { Header } from "@/components/layout/header";
import { Hero } from "@/components/sections/hero";
import { Features } from "@/components/sections/features";
import { TimelineSection } from "@/components/sections/timeline";
import { Challenge } from "@/components/sections/challenge";
import { Pricing } from "@/components/sections/pricing";
import { Footer } from "@/components/layout/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-gray-50 transition-colors duration-300">
      <Header />
      <main>
        <Hero />

        <Features />

        <TimelineSection />

        <Challenge />

        <Pricing />
      </main>
      <Footer />
    </div>
  );
}
