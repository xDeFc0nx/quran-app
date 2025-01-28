"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation"; // Use next/navigation
import { motion } from "framer-motion";
import { cn } from "../../../lib/utils";
import Image from "next/image";
import Link from "next/link";

interface TabProps {
  text: string;
  selected: boolean;
  href: string;
  onClick: () => void;
}

export default function NavTabs({ tabs }: { tabs: string[] }) {
  const pathname = usePathname();
  const [selected, setSelected] = useState<string>(pathname);

  useEffect(() => {
    setSelected(pathname);
  }, [pathname]);

  return (
    <div
      className="fixed top-0 left-0 z-50 w-full flex flex-wrap items-center justify-around gap-4 p-4 bg-transparent"
    >
      <Link href="/">
        <Image src="/logo.png" alt="Logo" width={100} height={100} />
      </Link>
      <div className="flex space-x-4">
        {tabs.map((tab) => (
          <Tab
            key={tab}
            href={tab}
            text={tab}
            selected={selected === getUrl(tab)}
            onClick={() => setSelected(getUrl(tab))}
          />
        ))}
      </div>
    </div>
  );
}


const Tab = ({ text, selected, onClick, href }: TabProps) => {
  return (
    <Link
      href={getUrl(href)}
      onClick={onClick}
      className={cn(
        "relative rounded-md p-2 text-sm transition-all",
        selected ? "text-white" : "text-slate-300 hover:font-black"
      )}
    >
      <p className="relative z-50 min-w-20">{text}</p>
      {selected && (
        <motion.span
          layoutId="tabs"
          transition={{ type: "spring", duration: 0.5 }}
          className="absolute inset-0 rounded-sm bg-gradient-to-r from-logoGray to-logoBlue"
        />
      )}
    </Link>
  );
};

// Utility to generate URLs based on tab names
const getUrl = (href: string): string => {
  if (!href) throw new Error("The href parameter is required.");
  const normalizedHref = href.trim().toLowerCase();
  return normalizedHref === "home" ? "/" : `/${normalizedHref}`;
};
