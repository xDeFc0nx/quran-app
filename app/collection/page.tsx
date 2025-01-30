"use client";
import React from "react";
import { Sparkles } from "@/components/aceternity/sparkles";
import StaticCards from "@/components/ui/apple-cards-carousel";

export default function CardsCarousel() {

  return (
    <div className="flex flex-col justify-center pt-40">
      <Sparkles name="Choose your path" />
      <StaticCards />
    </div>
  );
}