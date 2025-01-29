"use client";
import Image from "next/image";
import React from "react";
import { TextEffect } from "@/components/ui/text-effect";
import { Sparkles } from "@/components/aceternity/sparkles";
import MoodCards from "@/components/animata/card/shiny-card";

export default function CardsCarousel() {
  return (
    <div className="flex flex-col justify-center pt-40">
      <Sparkles name="Choose your Mood" />

      <MoodCards />
    </div>
  );
}

export function TextEffectPerChar() {
  return (
    <TextEffect per="char" preset="fade" className="text-lg max-w-2xl ">
      Generate Quranic ayahs tailored to your mood, discover random verses for
      fresh wisdom, or find the Qibla in an instant.
    </TextEffect>
  );
}
