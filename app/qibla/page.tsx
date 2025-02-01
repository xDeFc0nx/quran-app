"use client";

import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import Image from "next/image";

const KAABA_LAT = 21.422487;
const KAABA_LONG = 39.826206;

const QiblaCompass: React.FC = () => {
  const [isCompassActive, setIsCompassActive] = useState(false);
  const [isMobileDevice, setIsMobileDevice] = useState(false);
  const compassRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLSpanElement>(null);
  const qiblaDirectionRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    setIsMobileDevice(/iPhone|iPad|iPod|Android/i.test(window.navigator.userAgent));
  }, []);

  const calculateQiblaDirection = (userLat: number, userLong: number): number => {
    const toRad = (deg: number) => deg * (Math.PI / 180);
    const toDeg = (rad: number) => rad * (180 / Math.PI);

    const lat1 = toRad(userLat);
    const lat2 = toRad(KAABA_LAT);
    const long1 = toRad(userLong);
    const long2 = toRad(KAABA_LONG);

    const y = Math.sin(long2 - long1) * Math.cos(lat2);
    const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(long2 - long1);

    const qibla = toDeg(Math.atan2(y, x));
    return (qibla + 360) % 360;
  };

  const startCompass = async () => {
    if (typeof window === 'undefined' || !window.navigator?.geolocation) {
      alert("Geolocation is not supported");
      return;
    }

    // Request permission for iOS & Safari
    const deviceOrientationEvent = window.DeviceOrientationEvent as
      | (typeof window.DeviceOrientationEvent & {
        requestPermission?: () => Promise<"granted" | "denied">;
      })
      | undefined;

    try {
      // iOS permission request
      if (typeof deviceOrientationEvent?.requestPermission === 'function') {
        const permission = await deviceOrientationEvent.requestPermission();
        if (permission !== 'granted') {
          alert("Permission denied for device orientation");
          return;
        }
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLat = position.coords.latitude;
          const userLong = position.coords.longitude;
          const qiblaDir = calculateQiblaDirection(userLat, userLong);

          if (qiblaDirectionRef.current) {
            qiblaDirectionRef.current.textContent = qiblaDir.toFixed(1);
          }

          const handleOrientation = (event: DeviceOrientationEvent) => {
            if (event.alpha === null) return;

            const heading = event.alpha;
            if (headingRef.current) {
              headingRef.current.textContent = Math.round(heading).toString();
            }

            if (compassRef.current) {
              gsap.to(compassRef.current, {
                rotation: qiblaDir - heading,
                duration: 0.3,
                ease: "none"
              });
            }
          };

          if (isMobileDevice) {
            window.addEventListener('deviceorientation', handleOrientation, true);
          } else {
            if (compassRef.current) {
              gsap.to(compassRef.current, {
                rotation: qiblaDir,
                duration: 0.3,
                ease: "none"
              });
            }
          }

          setIsCompassActive(true);
        },
        (error) => alert("Error getting location: " + error.message)
      );
    } catch (error) {
      console.error('Error:', error);
      alert("An error occurred while starting the compass");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen text-center gap-5">
      <div
        ref={compassRef}
        className="relative w-[300px] h-[300px] mx-auto"
      >
        <Image
          src="/images/compass.png"
          alt="Compass"
          width={500}
          height={500}
          className="absolute w-full h-full"
          priority
        />
      </div>
      <div>
        <h2>Qibla Compass</h2>
        <p>Heading: <span ref={headingRef}>0</span>°</p>
        <p>Qibla Direction: <span ref={qiblaDirectionRef}>0</span>°</p>
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