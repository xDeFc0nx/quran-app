import NavTabs from "@/components/animata/container/nav-tabs";

export default function Home() {
  return (
    <div className="">
      <NavTabs
        tabs={[
          'Profile',
          'Search',
          'About Us',
          'Contact Us',
          'Settings'
        ]}
      />
    </div>
  );
}
