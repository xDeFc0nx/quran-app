"use client";
import { TextGenerator } from "@/components/aceternity/text-generator";
import { BackgroundBeams } from "@/components/ui/background-beams";
import React from "react";
import LightButton from "./light-button";

export function HeroSection() {
  return (
    <div className="h-screen w-full rounded-md bg-neutral-950 relative flex flex-col items-center justify-center antialiased">
      <div className="max-w-6xl m-auto p-4 flex flex-col items-center gap-10">
        <TextGenerator />
        <LightButton href="/collection" content="Get Started" />
      </div>
      <BackgroundBeams />
    </div>
  );
}
