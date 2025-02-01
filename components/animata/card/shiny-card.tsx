import { RefObject, useCallback, useRef } from "react";
import { cn } from "@/lib/utils";
import { useMousePosition } from "@/hooks/useMoutsePosition";
import { useRouter } from "next/navigation";

type Mood = {
  name: string;
  route: string;
  backgroundImage: string;
};

const moods: Mood[] = [
  { name: "Angry", route: "/mood/angry", backgroundImage: "/images/angry.jpg" },
  { name: "Sad", route: "/mood/sad", backgroundImage: "/images/sad.jpg" },
  { name: "Low Iman", route: "/mood/low-iman", backgroundImage: "/images/low-iman.jpg" },
  { name: "Reward", route: "/mood/reward", backgroundImage: "/images/reward.jpg" },
];

export default function MoodCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 p-6 max-w-4xl mx-auto mt-[-60px] hover:cursor-pointer">
      {moods.map((mood) => (
        <ShinyCard key={mood.name} mood={mood} />
      ))}
    </div>
  );
}

function ShinyCard({ mood }: { mood: Mood }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const update = useCallback(({ x, y }: { x: number; y: number }) => {
    if (!overlayRef.current) return;

    const { width, height } = overlayRef.current?.getBoundingClientRect() ?? {};
    const xOffset = x - width / 2;
    const yOffset = y - height / 2;

    overlayRef.current?.style.setProperty("--x", `${xOffset}px`);
    overlayRef.current?.style.setProperty("--y", `${yOffset}px`);
  }, []);

  useMousePosition(containerRef as RefObject<HTMLElement>, update);

  return (
    <div
      ref={containerRef}
      className={cn(
        "group relative w-72 h-80 min-w-fit max-w-full overflow-hidden rounded-3xl border border-border bg-zinc-700 p-6 text-zinc-200 shadow-lg"
      )}
      style={{
        backgroundImage: `url(${mood.backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      onClick={() => router.push(mood.route)}
    >
      <div
        ref={overlayRef}
        className="-z-1 absolute h-64 w-64 rounded-full bg-white opacity-0 bg-blend-soft-light blur-3xl transition-opacity group-hover:opacity-20"
        style={{
          transform: "translate(var(--x), var(--y))",
        }}
      />

      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
        <h2 className="text-2xl font-semibold text-white">{mood.name}</h2>
      </div>
    </div>
  );
}
