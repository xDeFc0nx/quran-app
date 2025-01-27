import NavTabs from "@/components/animata/container/nav-tabs";

export default function Home() {
  return (
    <div className="">
      <NavTabs
        tabs={[
          'Home',
          'FEATURES',
          'Collection',
          'Qibla',
          'Settings'
        ]}
      />
    </div>
  );
}
