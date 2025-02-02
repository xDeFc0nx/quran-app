"use client";

import { motion } from "framer-motion";
import React from "react";
import { AuroraBackground } from "../ui/aurora-background";
import { TextGenerator } from "./text-generator";
import LightButton from "./light-button";
import Image from "next/image";

export function AuroraBackgroundDemo() {
  return (
    <AuroraBackground>
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative flex flex-col gap-4 items-center justify-center px-4"
      >
        <div className="max-w-6xl m-auto p-4 relative flex flex-col items-center justify-center min-h-screen px-4">
          {/* Logo Image Positioned at the Top Center */}
          <Image
            src="/logo.png"
            alt="Logo"
            height={500}
            width={500}
            className="absolute top-10 left-1/2 transform -translate-x-1/2 w-40 md:hidden"
          />

          {/* Centered Content */}
          <motion.div
            initial={{ opacity: 0.0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              ease: "easeInOut",
            }}
            className="flex flex-col gap-10 items-center text-center"
          >
            <TextGenerator text="At Sevteen, we fuse modern technology with timeless Islamic values, helping the Ummah stay seamlessly connected to their Deen wherever they are" />
            <LightButton href="/collection" content="Get Started" />
          </motion.div>
        </div>
      </motion.div>
    </AuroraBackground>
  );
}
