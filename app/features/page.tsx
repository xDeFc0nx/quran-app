"use client";
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