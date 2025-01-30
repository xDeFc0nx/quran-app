"use client";

import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import Image from "next/image";

const KAABA_LAT = 21.422487; // Kaaba latitude
const KAABA_LONG = 39.826206; // Kaaba longitude

const QiblaCompass: React.FC = () => {
  const [isCompassActive, setIsCompassActive] = useState(false);
  const [isMobileDevice, setIsMobileDevice] = useState(false);
  const compassRef = useRef<HTMLDivElement | null>(null);
  const needleRef = useRef<HTMLImageElement | null>(null);
  const headingRef = useRef<HTMLSpanElement | null>(null);
  const qiblaDirectionRef = useRef<HTMLSpanElement | null>(null);

  // Check if the device is mobile
  useEffect(() => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    setIsMobileDevice(isMobile);
  }, []);

  const calculateQiblaDirection = (
    userLat: number,
    userLong: number,
    heading: number
  ) => {
    const degreesToRadians = (degrees: number) => degrees * (Math.PI / 180);
    const radiansToDegrees = (radians: number) => radians * (180 / Math.PI);

    const lat1 = degreesToRadians(userLat);
    const lat2 = degreesToRadians(KAABA_LAT);
    const deltaLong = degreesToRadians(KAABA_LONG - userLong);

    const y = Math.sin(deltaLong) * Math.cos(lat2);
    const x =
      Math.cos(lat1) * Math.sin(lat2) -
      Math.sin(lat1) * Math.cos(lat2) * Math.cos(deltaLong);

    let bearing = radiansToDegrees(Math.atan2(y, x));
    bearing = (bearing + 360) % 360; // Normalize to 0-360

    return (bearing - heading + 360) % 360; // Adjust based on heading
  };

  const startCompass = () => {
    if (!isMobileDevice) {
      alert("Compass is only supported on mobile devices.");
      return;
    }

    if (!("DeviceOrientationEvent" in window)) {
      alert("Your browser does not support device orientation.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLat = position.coords.latitude;
        const userLong = position.coords.longitude;

        const updateCompass = (event: DeviceOrientationEvent) => {
          if (event.alpha === null) {
            alert(
              "Unable to retrieve device orientation. Ensure you are using a supported device."
            );
            return;
          }
          const heading = Math.round(event.alpha);

          const qiblaDirection = calculateQiblaDirection(
            userLat,
            userLong,
            heading
          );

          // Update heading and Qibla direction in the DOM
          if (headingRef.current)
            headingRef.current.textContent = heading.toString();
          if (qiblaDirectionRef.current)
            qiblaDirectionRef.current.textContent = qiblaDirection.toFixed(2);

          // Animate the compass and Qibla needle
          if (compassRef.current) {
            gsap.to(compassRef.current, {
              rotation: -heading,
              duration: 1,
              ease: "power2.out",
            });
          }
          if (needleRef.current) {
            gsap.to(needleRef.current, {
              rotation: qiblaDirection,
              duration: 1,
              ease: "power2.out",
            });
          }
        };

        window.addEventListener("deviceorientation", updateCompass);
        setIsCompassActive(true);
      },
      (error) => {
        // Handle geolocation errors
        switch (error.code) {
          case error.PERMISSION_DENIED:
            alert("Location access denied by the user. Please allow access.");
            break;
          case error.POSITION_UNAVAILABLE:
            alert("Location information is unavailable.");
            break;
          case error.TIMEOUT:
            alert("The request to get user location timed out.");
            break;
          default:
            alert("An unknown error occurred while accessing location.");
            break;
        }
        console.error("Geolocation error:", error.message);
      }
    );
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen text-center gap-5">
      <div
        ref={compassRef}
        style={{
          position: "relative",
          width: "300px",
          height: "300px",
          margin: "0 auto",
        }}
      >
        <Image
          src="/images/qibla.png" // Replace with the actual compass image path
          alt="Compass"
          width={500}
          height={500}
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
          }}
        />
      </div>
      <div>
        <h2>Qibla Compass</h2>
        <p>
          Heading: <span ref={headingRef}>0</span>°
        </p>
        <p>
          Qibla Direction: <span ref={qiblaDirectionRef}>0</span>°
        </p>
        {!isCompassActive && (
          <button
            style={{
              border: "2px solid #8B6C62",
              padding: "10px 20px",
              fontSize: "16px",
              marginTop: "20px",
            }}
            className="hover:shadow-xl hover:bg-green-400 hover:text-black"
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