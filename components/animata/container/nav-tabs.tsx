"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "../../../lib/utils";
import Image from "next/image";
import Link from "next/link";

interface TabProps {
  text: string;
  selected: boolean;
  href: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
}

export default function NavTabs({ tabs }: { tabs: string[] }) {
  const sanitizedTabs = tabs.filter((tab) => tab.trim().length > 0); // Filter out invalid tabs
  const [selected, setSelected] = useState<string>(sanitizedTabs[0]);

  return (
    <div className="flex flex-wrap items-center justify-around gap-4 p-2">
      <Link href="/">
        <Image src="/logo.png" alt="Logo" width={100} height={100} />
      </Link>
      <div className="flex text-center">
        {sanitizedTabs.map((tab) => (
          <Tab
            href={tab}
            text={tab}
            selected={selected === tab}
            setSelected={setSelected}
            key={tab}
          />
        ))}
      </div>
    </div>
  );
}

const Tab = ({ text, selected, setSelected, href }: TabProps) => {
  const url = (href: string): string => {
    const normalizedHref = href?.trim().toLowerCase() || "";
    if (!normalizedHref) {
      console.warn("The href parameter is empty or undefined.");
      return "/";
    }
    return normalizedHref === "home" ? "/" : `/${normalizedHref}`;
  };

  return (
    <Link
      href={url(href)}
      onClick={() => setSelected(text)}
      className={cn(
        "relative flex rounded-md p-2 text-sm transition-all",
        selected ? "text-white" : "text-slate-300 hover:font-black"
      )}
      aria-current={selected ? "page" : undefined}
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
