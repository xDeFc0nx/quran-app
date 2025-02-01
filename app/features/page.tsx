"use client";
import React from "react";
import { Sparkles } from "@/components/aceternity/sparkles";
import MoodCards from "@/components/animata/card/shiny-card";

export default function CardsCarousel() {
  return (
    <div className="flex flex-col justify-center items-center uppercase pt-10 pb-20 md:pt-20 md:pb-0 md:h-screen">
      <Sparkles name="Choose your Mood" />

      <MoodCards />
    </div>
  );
}