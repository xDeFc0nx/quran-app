"use client";
import React, { useState } from "react";
import Image, { type ImageProps } from "next/image";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface Card {
  src: string;
  title: string;
  category: string;
  url: string;
}

const cards: Card[] = [
  {
    src: "/images/happy-man.jpg",
    title: "Mood Selector",
    category: "Study quran based on your mood",
    url: "/features",
  },
  {
    src: "/images/kaaba.jpg",
    title: "Qibla Direction",
    category: "Checkout Qibla direction",
    url: "/qibla",
  },
  {
    src: "/images/world.gif",
    title: "Ayah Generator",
    category: "Generator Random Ayahs",
    url: "/ayah-generator",
  },
];

export default function StaticCards() {
  return (
    <div className="flex flex-row justify-center gap-4 py-10 mt-[-60px]">
      {cards.map((card, index) => (
        <Card key={index} card={card} />
      ))}
    </div>
  );
}

const Card = ({ card }: { card: Card }) => {

  return (
    <>
      <Link
        href={card.url}
        className="rounded-3xl bg-gray-100 dark:bg-neutral-900 h-80 w-56 md:h-[30rem] md:w-96 overflow-hidden flex flex-col items-start justify-start relative z-10"
      >
        <div className="absolute h-full top-0 inset-x-0 bg-gradient-to-b from-black/50 via-transparent to-transparent z-30 pointer-events-none" />
        <div className="relative z-40 p-8">
          <p className="text-white text-sm md:text-base font-medium font-sans text-left">
            {card.category}
          </p>
          <p className="text-white text-xl md:text-3xl font-semibold max-w-xs text-left font-sans mt-2">
            {card.title}
          </p>
        </div>
        <BlurImage src={card.src} alt={card.title} fill className="object-cover absolute z-10 inset-0" />
      </Link>
    </>
  );
};

const BlurImage = ({ height, width, src, className, alt, ...rest }: ImageProps) => {
  const [isLoading, setLoading] = useState(true);
  return (
    <Image
      className={cn("transition duration-300", isLoading ? "blur-sm" : "blur-0", className)}
      onLoad={() => setLoading(false)}
      src={src || "/placeholder.svg"}
      width={width}
      height={height}
      loading="lazy"
      decoding="async"
      blurDataURL={typeof src === "string" ? src : undefined}
      alt={alt || "Background image"}
      {...rest}
    />
  );
};
