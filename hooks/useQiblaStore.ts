import { create } from "zustand";
import { gsap } from "gsap";

const KAABA_LAT = 21.422487;
const KAABA_LONG = 39.826206;

interface QiblaState {
    isCompassActive: boolean;
    isMobileDevice: boolean;
    heading: number;
    qiblaDirection: number;
    startCompass: () => Promise<void>;
    calculateQiblaDirection: (userLat: number, userLong: number) => number;
    setIsMobileDevice: (isMobile: boolean) => void;
}

interface DeviceStore {
    isMobileDevice: boolean;
    detectDevice: () => void;
}

export const useDeviceStore = create<DeviceStore>((set) => ({
    isMobileDevice: false,
    detectDevice: () => {
        const isMobile = /iPhone|iPad|iPod|Android/i.test(window.navigator.userAgent);
        set({ isMobileDevice: isMobile });
    },
}));

export const useQiblaStore = create<QiblaState>((set, get) => ({
    isCompassActive: false,
    isMobileDevice: false,
    heading: 0,
    qiblaDirection: 0,

    setIsMobileDevice: (isMobile) => set({ isMobileDevice: isMobile }),

    calculateQiblaDirection: (userLat, userLong) => {
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
    },

    startCompass: async () => {
        if (typeof window === "undefined" || !window.navigator?.geolocation) {
            alert("Geolocation is not supported");
            return;
        }

        try {
            const deviceOrientationEvent = window.DeviceOrientationEvent as unknown as {
                requestPermission?: () => Promise<"granted" | "denied">;
            };

            if (deviceOrientationEvent?.requestPermission) {
                const permission = await deviceOrientationEvent.requestPermission();
                if (permission !== "granted") {
                    alert("Permission denied for device orientation");
                    return;
                }
            }

            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const userLat = position.coords.latitude;
                    const userLong = position.coords.longitude;
                    const qiblaDir = get().calculateQiblaDirection(userLat, userLong);

                    set({ qiblaDirection: qiblaDir });

                    const handleOrientation = (event: DeviceOrientationEvent) => {
                        if (event.alpha === null) return;

                        const heading = event.alpha;
                        set({ heading });

                        const compassElement = document.getElementById("compass");
                        if (compassElement) {
                            const rotation = qiblaDir - heading;
                            gsap.to(compassElement, {
                                rotation,
                                duration: 0.2,
                                ease: "none",
                                overwrite: true,
                            });
                        }
                    };

                    if (get().isMobileDevice) {
                        window.addEventListener("deviceorientationabsolute", handleOrientation, true);
                        window.addEventListener("deviceorientation", handleOrientation, true);
                    } else {
                        const compassElement = document.getElementById("compass");
                        if (compassElement) {
                            gsap.to(compassElement, {
                                rotation: qiblaDir,
                                duration: 0.2,
                                ease: "none",
                            });
                        }
                    }

                    set({ isCompassActive: true });
                },
                (error) => alert("Error getting location: " + error.message)
            );
        } catch (error) {
            if (error instanceof Error) {
                console.error("Error:", error.message);
                alert("Error starting compass: " + error.message);
            } else {
                console.error("Unknown error:", error);
                alert("Unknown error starting compass");
            }
        }
    },
}));