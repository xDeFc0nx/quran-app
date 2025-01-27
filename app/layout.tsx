import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AnimatedDock from "@/components/animata/container/animated-dock";
import NavTabs from "@/components/animata/container/nav-tabs";
import { HomeIcon, Search, Bell, User } from "lucide-react";

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
          <NavTabs
            tabs={["Profile", "Search", "About Us", "Contact Us", "Settings"]}
          />
        </div>

        {children}
        {/* AnimatedDock visible only on screens smaller than md */}
        <div className="w-full fixed bottom-4 flex items-center justify-center border-t-[1px] border-white md:hidden">
          <AnimatedDock
            items={[
              {
                href: "/",
                icon: <HomeIcon />,
                title: "Home",
              },
              {
                href: "/search",
                icon: <Search />,
                title: "Search",
              },
              {
                href: "/notifications",
                icon: <Bell />,
                title: "Notifications",
              },
              {
                href: "/profile",
                icon: <User />,
                title: "Profile",
              },
            ]}
          />
        </div>
      </body>
    </html>
  );
}
