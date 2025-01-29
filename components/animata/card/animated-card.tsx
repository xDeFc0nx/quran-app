import { RefObject, useCallback, useRef } from "react";
import { cn } from "@/lib/utils";
import { useMousePosition } from "@/hooks/useMoutsePosition";

function calculateCardRotation({
  currentX,
  currentY,
  centerX,
  centerY,
  maxRotationX,
  maxRotationY,
}: {
  currentX: number;
  currentY: number;
  centerX: number;
  centerY: number;
  maxRotationX: number;
  maxRotationY: number;
}) {
  const deltaX = currentX - centerX;
  const deltaY = currentY - centerY;
  const maxDistance = Math.sqrt(centerX ** 2 + centerY ** 2);
  const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);
  const rotationFactor = distance / maxDistance;

  const rotationY = ((-deltaX / centerX) * maxRotationY * rotationFactor).toFixed(2);
  const rotationX = ((deltaY / centerY) * maxRotationX * rotationFactor).toFixed(2);
  return { rotationX, rotationY };
}

export default function MergedCard({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const resetRef = useRef<NodeJS.Timeout>(undefined);

  const update = useCallback(({ x, y }: { x: number; y: number }) => {
    if (!containerRef.current || !overlayRef.current) return;

    // Get dimensions
    const { width, height } = containerRef.current.getBoundingClientRect();

    // Apply tilt effect
    const { rotationX, rotationY } = calculateCardRotation({
      centerX: width / 2,
      centerY: height / 2,
      currentX: x,
      currentY: y,
      maxRotationX: 4,
      maxRotationY: 6,
    });

    containerRef.current.style.setProperty("--x", `${rotationX}deg`);
    containerRef.current.style.setProperty("--y", `${rotationY}deg`);

    // Apply glow effect
    const xOffset = x - width / 2;
    const yOffset = y - height / 2;
    overlayRef.current.style.setProperty("--x", `${xOffset}px`);
    overlayRef.current.style.setProperty("--y", `${yOffset}px`);
  }, []);

  useMousePosition(containerRef as RefObject<HTMLElement>, update);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative max-w-96 transform-gpu overflow-hidden rounded-3xl border border-border bg-zinc-700 p-6 text-zinc-200 shadow-lg transition-transform ease-linear will-change-transform",
        className
      )}
      style={{
        transform: "perspective(400px) rotateX(var(--x)) rotateY(var(--y))",
        transitionDuration: "50ms",
      }}
      onMouseEnter={() => {
        resetRef.current = setTimeout(() => {
          if (containerRef.current) {
            containerRef.current.style.transitionDuration = "0ms";
          }
        }, 300);
      }}
      onMouseLeave={() => {
        clearTimeout(resetRef.current);
        if (containerRef.current) {
          containerRef.current.style.transitionDuration = "50ms";
          containerRef.current.style.setProperty("--x", "0deg");
          containerRef.current.style.setProperty("--y", "0deg");
        }
      }}
    >
      {/* Glowing effect */}
      <div
        ref={overlayRef}
        className="-z-1 absolute h-64 w-64 rounded-full bg-white opacity-0 bg-blend-soft-light blur-3xl transition-opacity"
        style={{
          transform: "translate(var(--x), var(--y))",
        }}
      />

      <h1 className="font-mono text-6xl tracking-tight">Merged Card</h1>
      <p className="text-xl font-medium text-zinc-400">This combines both effects</p>
      <span className="mt-4 text-sm text-zinc-400">Mouse over to see the magic!</span>
    </div>
  );
}
