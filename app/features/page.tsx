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

const DummyContent = () => {
  return (
    <>
      {[...new Array(3).fill(1)].map((index) => {
        return (
          <div
            key={"dummy-content" + index}
            className="bg-[#F5F5F7] p-8 md:p-14 rounded-3xl mb-4"
          >
            <p className="text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
              <span className="font-bold text-neutral-200">
                The first rule of Apple club is that you boast about Apple club.
              </span>{" "}
              Keep a journal, quickly jot down a grocery list, and take amazing
              class notes. Want to convert those notes to text? No problem.
              Langotiya jeetu ka mara hua yaar is ready to capture every
              thought.
            </p>
            <Image
              src="https://assets.aceternity.com/macbook.png"
              alt="Macbook mockup from Aceternity UI"
              height="500"
              width="500"
              className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain"
            />
          </div>
        );
      })}
    </>
  );
};

export function TextEffectPerChar() {
  return (
    <TextEffect per="char" preset="fade" className="text-lg max-w-2xl ">
      Generate Quranic ayahs tailored to your mood, discover random verses for
      fresh wisdom, or find the Qibla in an instant.
    </TextEffect>
  );
}
