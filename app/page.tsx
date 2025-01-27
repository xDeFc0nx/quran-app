import AnimatedDock from "@/components/animata/container/animated-dock";
import NavTabs from "@/components/animata/container/nav-tabs";
import { Home as HomeIcon, Search, Bell, User } from "lucide-react";

export default function Home() {
  return (
    <div className="w-full">
      {/* NavTabs visible only on md and larger screens */}
      <div className="hidden md:block">
        <NavTabs
          tabs={["Profile", "Search", "About Us", "Contact Us", "Settings"]}
        />
      </div>

      {/* AnimatedDock visible only on screens smaller than md */}
      <div className="fixed bottom-4 left-0 right-0 block md:hidden">
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
          smallClassName="w-full px-4"
        />
      </div>
    </div>
  );
}
