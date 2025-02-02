"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { useQiblaStore } from "@/hooks/useQiblaStore";

const QiblaCompass: React.FC = () => {
  const {
    isCompassActive,
    heading,
    qiblaDirection,
    startCompass,
    setIsMobileDevice,
  } = useQiblaStore();

  useEffect(() => {
    setIsMobileDevice(/iPhone|iPad|iPod|Android/i.test(window.navigator.userAgent));
  }, [setIsMobileDevice]);

  return (
    <div className="flex flex-col justify-center items-center h-screen text-center gap-5">
      <div
        id="compass"
        className="relative w-[300px] h-[300px] mx-auto"
      >
        <Image
          src="/images/compass.png"
          alt="Compass"
          width={500}
          height={500}
          className="absolute w-full h-full"
          loading="lazy"
          priority={false}
        />
      </div>
      <div>
        <h2>Qibla Compass</h2>
        <p>Heading: <span>{Math.round(heading)}</span>°</p>
        <p>Qibla Direction: <span>{qiblaDirection.toFixed(1)}</span>°</p>
        {!isCompassActive && (
          <button
            className="mt-5 px-5 py-2.5 text-base border-2 border-[#8B6C62] hover:shadow-xl hover:bg-green-400 hover:text-black"
            onClick={startCompass}
          >
            Start Qibla Compass
          </button>
        )}
      </div>
    </div>
  );
};

export default QiblaCompass;