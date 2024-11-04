import { Button } from "@/components/ui/button";
import { Mountain, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/images/wanderer.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4">
        <Mountain className="w-16 h-16 mx-auto mb-8 text-purple-400" />

        <h1 className="text-3xl font-serif italic text-white mb-2">
          Not all those who wander are lost
        </h1>

        <p className="text-gray-300 mb-8 max-w-md mx-auto">
          But this page seems to have wandered off the trail. Let&apos;s get you
          back on track.
        </p>

        <Link href="/">
          <Button
            variant="outline"
            className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Return Home
          </Button>
        </Link>
      </div>

      {/* Optional: Decorative elements */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
    </div>
  );
}
