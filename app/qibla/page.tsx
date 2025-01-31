"use client";

import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import Image from "next/image";

const KAABA_LAT = 21.422487; // Kaaba latitude
const KAABA_LONG = 39.826206; // Kaaba longitude

const QiblaCompass: React.FC = () => {
  const [isCompassActive, setIsCompassActive] = useState(false);
  const [isMobileDevice, setIsMobileDevice] = useState(false);
  const [qiblaDirection, setQiblaDirection] = useState(0);
  const compassRef = useRef<HTMLDivElement | null>(null);
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
    heading: number = 0
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

  const startCompass = async () => {
    if (!isMobileDevice) {
      // For desktop, just calculate the Qibla direction based on location
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLat = position.coords.latitude;
          const userLong = position.coords.longitude;
          const qiblaDirection = calculateQiblaDirection(userLat, userLong);
          setQiblaDirection(qiblaDirection);

          if (qiblaDirectionRef.current) {
            qiblaDirectionRef.current.textContent = qiblaDirection.toFixed(2);
          }

          if (compassRef.current) {
            gsap.to(compassRef.current, {
              rotation: qiblaDirection,
              duration: 1,
              ease: "power2.out",
            });
          }

          setIsCompassActive(true);
        },
        (error) => {
          alert("Error getting location: " + error.message);
        }
      );
      return;
    }

    if (!("DeviceOrientationEvent" in window)) {
      alert("Your browser does not support device orientation.");
      return;
    }

    // Request permission for iOS
    const deviceOrientationEvent = window.DeviceOrientationEvent as
      | (typeof window.DeviceOrientationEvent & {
          requestPermission?: () => Promise<"granted" | "denied">;
        })
      | undefined;

    if (deviceOrientationEvent?.requestPermission) {
      try {
        const permissionState = await deviceOrientationEvent.requestPermission();
        if (permissionState !== "granted") {
          alert("Permission denied for device orientation.");
          return;
        }
      } catch (error) {
        alert("Error requesting device orientation permission.");
        console.log(error);
        return;
      }
    }

    // Get user location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLat = position.coords.latitude;
        const userLong = position.coords.longitude;

        const updateCompass = (event: DeviceOrientationEvent) => {
          if (event.alpha === null) {
            alert(
              "Unable to retrieve device orientation. Ensure sensors are enabled and try a supported browser."
            );
            return;
          }

          const heading = Math.round(event.alpha);
          const qiblaDirection = calculateQiblaDirection(
            userLat,
            userLong,
            heading
          );

          // Update UI
          if (headingRef.current)
            headingRef.current.textContent = heading.toString();
          if (qiblaDirectionRef.current)
            qiblaDirectionRef.current.textContent = qiblaDirection.toFixed(2);

          // Animate compass
          if (compassRef.current) {
            gsap.to(compassRef.current, {
              rotation: -heading + qiblaDirection,
              duration: 1,
              ease: "power2.out",
            });
          }
        };

        if ("ondeviceorientationabsolute" in window) {
          (window as Window).addEventListener("deviceorientationabsolute", updateCompass);
        } else if ("ondeviceorientation" in window) {
          (window as Window).addEventListener("deviceorientation", updateCompass);
        } else {
          alert("Device orientation is not supported on this device.");
          return;
        }

        setIsCompassActive(true);
      },
      (error) => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            alert("Location access denied. Please allow access.");
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
          src="/images/compass.png" // Replace with the actual compass image path
          alt="Compass"
          width={500}
          height={500}
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            transform: `rotate(${qiblaDirection}deg)`,
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