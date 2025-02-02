import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { HomeIcon, Search } from "lucide-react";
import AnimatedDock from "@/components/animata/container/animated-dock";
import NavTabs from "@/components/animata/container/nav-tabs";
import Image from "next/image";
import { BackgroundBeams } from "@/components/ui/background-beams";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* NavTabs visible only on md and larger screens */}
        <div className="hidden md:block">
          <NavTabs tabs={["Home", "Collection", "Features", "Qibla"]} />
        </div>

        {children}
        {/* AnimatedDock visible only on screens smaller than md */}
        <div className="w-full bg-black fixed bottom-0 pb-4 flex items-center justify-center border-t-[1px] border-white md:hidden z-50">
          <AnimatedDock
            items={[
              {
                href: "/",
                icon: <HomeIcon />,
                title: "Home",
              },
              {
                href: "/collection",
                icon: <Search />,
                title: "Collection",
              },
              {
                href: "/features",
                icon: (
                  <Image
                    src="/features.svg"
                    alt="Compass"
                    height={500}
                    width={500}
                    className="h-full w-full"
                    loading="lazy"
                    priority={false}
                  />
                ),
                title: "Features",
              },
              {
                href: "/qibla",
                icon: (
                  <Image
                    src="/kaaba-icon.svg"
                    alt="Compass"
                    height={500}
                    width={500}
                    className="h-full w-full"
                    loading="lazy"
                    priority={false}
                  />
                ),
                title: "Qibla",
              },
            ]}
          />
        </div>
        <BackgroundBeams />
      </body>
    </html>
  );
}
