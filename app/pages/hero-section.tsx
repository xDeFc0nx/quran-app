"use client";
import { TextGenerator } from "@/components/aceternity/text-generator";
import { BackgroundBeams } from "@/components/ui/background-beams";
import Link from "next/link";
import React from "react";

export function HeroSection() {
  return (
    <div className="h-[800px] w-full rounded-md bg-neutral-950 relative flex flex-col items-center justify-center antialiased">
      <div className="max-w-6xl m-auto p-4 flex flex-col items-center gap-10">
        <h1 className="relative z-10 text-lg md:text-5xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-sans font-bold">
          <TextGenerator />
        </h1>
        <Link
          href={"#"}
          className="inline-flex h-12 z-10 animate-shimmer items-center justify-center rounded-md border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-xl text-slate-400 transition-colors focus:outline-none focus:ring-0 focus:ring-slate-50 focus:ring-offset-2 focus:ring-offset-slate-50"
        >
          Get Started
        </Link>
      </div>
      <BackgroundBeams />
    </div>
  );
}
