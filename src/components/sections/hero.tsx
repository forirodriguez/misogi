"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Hero() {
  const [isVideoLoaded, setIsVideoLoaded] = useState(true);

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Video de fondo */}
      <div className="absolute inset-0 w-full h-full">
        <video
          autoPlay
          loop
          muted
          playsInline
          onLoadedData={() => setIsVideoLoaded(true)}
          onError={(e) => {
            console.error("Error loading video:", e);
            setIsVideoLoaded(true);
          }}
          className={`object-cover w-full h-full brightness-50 transition-opacity duration-1000 ${
            isVideoLoaded ? "opacity-100" : "opacity-0"
          }`}
          poster="/images/hero.jpg"
        >
          <source src="/videos/herovideo.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Contenido superpuesto */}
      <div className="relative z-10 h-full">
        <div className="container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white animate-fade-in-up">
              Visualize Your Life&apos;s Journey
            </h1>
            <p className="text-xl mb-8 text-gray-100 animate-fade-in-up animation-delay-200">
              Transform your life with Misogi. Track your progress, set
              ambitious goals, and conquer MISOGI challenges.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 animate-fade-in-up animation-delay-400">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-grow bg-white/10 text-white placeholder:text-gray-300 border-white/20 backdrop-blur-sm"
              />
              <Button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600">
                Get Started
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Overlay gradiente */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent pointer-events-none" />
    </section>
  );
}
