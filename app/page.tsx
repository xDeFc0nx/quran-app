import AnimatedDock from "@/components/animata/container/animated-dock";
import NavTabs from "@/components/animata/container/nav-tabs";
import { Home as HomeIcon, Search, Bell, User } from "lucide-react";

export default function Home() {
  return (
    <>
      {/* NavTabs visible only on md and larger screens */}
      <div className="hidden md:block">
        <NavTabs
          tabs={["Profile", "Search", "About Us", "Contact Us", "Settings"]}
        />
      </div>

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
    </>
  );
}
