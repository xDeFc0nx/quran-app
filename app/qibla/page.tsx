"use client";

import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import Image from "next/image";

const KAABA_LAT = 21.422487;
const KAABA_LONG = 39.826206;

// Define the iOS-specific DeviceOrientationEvent interface
interface DeviceOrientationEventiOS extends DeviceOrientationEvent {
  requestPermission?: () => Promise<"granted" | "denied">;
}

const QiblaCompass: React.FC = () => {
  const [isCompassActive, setIsCompassActive] = useState<boolean>(false);
  const [qiblaDirection, setQiblaDirection] = useState<number>(0);
  const [currentHeading, setCurrentHeading] = useState<number>(0);
  const compassRef = useRef<HTMLDivElement>(null);

  const degreesToRadians = (degrees: number): number => degrees * (Math.PI / 180);
  const radiansToDegrees = (radians: number): number => radians * (180 / Math.PI);

  function calculateQiblaBearing(
    userLat: Float32Array,
    userLon: Float32Array,
    kaabaLat = 21.4225,
    kaabaLon = 39.8262
  ) {
    const rad = Math.PI / 180;
    const dLon = (kaabaLon - userLon) * rad;
    const lat1 = userLat * rad;
    const lat2 = kaabaLat * rad;
    const y = Math.sin(dLon) * Math.cos(lat2);
    const x =
      Math.cos(lat1) * Math.sin(lat2) -
      Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);
    let bearing = Math.atan2(y, x) / rad;
    bearing = (bearing + 360) % 360;
    return bearing;
  }

  // Request permissions and initialize orientation handling
  permissionsButton.addEventListener("click", async () => {
    try {
      if (typeof DeviceOrientationEvent.requestPermission === "function") {
        const permission = await DeviceOrientationEvent.requestPermission();
        if (permission === "granted") {
          enableCompass();
        } else {
          info.innerHTML += "<p>Permission denied for compass access.</p>";
        }
      } else {
        enableCompass();
      }
    } catch (error) {
      info.innerHTML += `<p>Error requesting permissions: ${error.message}</p>`;
    }
  });

  function enableCompass() {
    permissionsButton.style.display = "none";

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLat = position.coords.latitude;
          const userLon = position.coords.longitude;
          qiblaBearing = calculateQiblaBearing(userLat, userLon);
          info.innerHTML = `
              <h2 id="main-head">Qibla Compass</h2>
              <p class="para">Heading: <span id="current-heading" >0.0</span>°</p>
              <p class="para">Qibla Direction: <span id="qibla-direction" >${qiblaBearing.toFixed(
                2
              )}</span>°</p>
          `;

          window.addEventListener("deviceorientation", handleOrientation);
        },
        (error) => {
          info.innerHTML = `<p>Error fetching location: ${error.message}</p>`;
        }
      );
    }
  }

  function handleOrientation(event) {
    let compass = event.webkitCompassHeading || Math.abs(event.alpha - 360);
    compassImage.style.transform = `rotate(${qiblaBearing - compass}deg)`;

    const currentHeading = compass.toFixed(1);
    document.getElementById("current-heading").textContent = currentHeading;
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen text-center gap-5">
      <div 
        ref={compassRef}
        className="relative w-72 h-72"
      >
        <Image
          src="/images/compass.png"
          alt="Compass"
          width={288}
          height={288}
          className="w-full h-full"
          priority
        />
      </div>
      <div>
        <h2 className="text-xl font-bold mb-4">Qibla Compass</h2>
        <p>Heading: {Math.round(currentHeading)}°</p>
        <p>Qibla Direction: {Math.round(qiblaDirection)}°</p>
        {!isCompassActive && (
          <button
            className="mt-4 px-6 py-2 border-2 border-[#8B6C62] hover:bg-green-400 hover:text-black hover:shadow-xl transition-all"
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