"use client";
import React from "react";
import { Sparkles } from "@/components/aceternity/sparkles";
import StaticCards from "@/components/ui/apple-cards-carousel";

export default function CardsCarousel() {

  return (
    <div className="flex flex-col justify-center pt-40">
      {/* <h2 className="max-w-7xl mx-auto text-xl md:text-5xl font-bold text-neutral-200 font-sans">
        Choose your path
      </h2> */}
      <Sparkles name="Choose your path" />
        {/* <CollectionCards /> */}
      <StaticCards />
    </div>
  );
}