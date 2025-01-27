"use client";

import { cn } from "../../../lib/utils"; // Import utility for conditional class names
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import Link from "next/link"; // Next.js Link component for navigation
import React, { useRef, useState } from "react"; // Importing React hooks

// Interface for props accepted by the AnimatedDock component
interface AnimatedDockProps {
  items: { title: string; icon: React.ReactNode; href: string }[]; // Array of menu items
  className?: string; // Optional class name for the dock
}

// Main AnimatedDock component
export default function AnimatedDock({ items, className }: AnimatedDockProps) {
  return (
    <div
      className={cn(
        "flex h-16 justify-around w-full items-end gap-4 rounded-2xl bg-white/10 px-4 pb-3 dark:bg-black/10 backdrop-blur-sm dark:border-gray-800/30",
        className
      )}
    >
      {items.map((item) => (
        <DockIcon key={item.title} {...item} />
      ))}
    </div>
  );
}

// Component for individual icons in the dock
function DockIcon({
  icon,
  href,
}: {
  title: string; // Title of the icon
  icon: React.ReactNode; // Icon component
  href: string; // Link destination
}) {
  const ref = useRef<HTMLDivElement>(null); // Ref for measuring distance from mouse
  const mouseXPosition = useMotionValue(Infinity); // Create a motion value for mouse X position

  // Calculate the distance from the mouse to the icon
  const distanceFromMouse = useTransform(mouseXPosition, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    const distance = val - bounds.x - bounds.width / 2;

    // Prevent extremely large or invalid values
    return Math.min(Math.max(distance, -150), 150);
  });

  // Transform properties for width and height based on mouse distance
  const widthTransform = useTransform(
    distanceFromMouse,
    [-150, 0, 150],
    [40, 80, 40]
  );
  const heightTransform = useTransform(
    distanceFromMouse,
    [-150, 0, 150],
    [40, 80, 40]
  );

  // Spring animations for smooth transitions
  const width = useSpring(widthTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  const height = useSpring(heightTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const [isHovered, setIsHovered] = useState(false);
  isHovered // State for hover effect

  return (
    <Link href={href}>
      <motion.div
        ref={ref} // Reference for measuring
        style={{ width, height }} // Set dynamic width and height
        onMouseMove={(e) => mouseXPosition.set(e.pageX)} // Update mouse X position on mouse move
        onMouseLeave={() => mouseXPosition.set(Infinity)} // Reset on mouse leave
        onMouseEnter={() => setIsHovered(true)} // Handle mouse enter
        className="relative flex aspect-square items-center justify-center rounded-full bg-white/20 text-black shadow-lg backdrop-blur-md dark:bg-black/20 dark:text-white"
      >
        <motion.div className="flex items-center justify-around">
          {icon} {/* Render the icon */}
        </motion.div>
      </motion.div>
    </Link>
  );
}
