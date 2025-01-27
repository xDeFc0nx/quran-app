"use client";
import { BackgroundBeams } from "@/components/ui/background-beams";
import React from "react";

export function HeroSection() {
  return (
    <div className="h-[40rem] w-full rounded-md bg-neutral-950 relative flex flex-col items-center justify-center antialiased">
      <div className="max-w-6xl mx-auto p-4">
        <h1 className="relative z-10 text-lg md:text-5xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-sans font-bold">
          At Sevteen, we fuse modern technology with timeless Islamic values,
          helping the Ummah stay seamlessly connected to their Deen wherever
          they are
        </h1>
        <p></p>
        {/* <p className="text-neutral-500 max-w-4xl mx-auto my-2 text-lg text-center relative z-10">
          Welcome to MailJet, the best transactional email service on the web.
          We provide reliable, scalable, and customizable email solutions for
          your business. Whether you&apos;re sending order confirmations,
          password reset emails, or promotional campaigns, MailJet has got you
          covered.
        </p> */}
      </div>
      <BackgroundBeams />
    </div>
  );
}
