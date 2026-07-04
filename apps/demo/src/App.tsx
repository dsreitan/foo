import { useEffect, useState } from "react";
import { ContextualNavigationBar, Logo, MenuItem, NavigationBar } from "kobber";
import { Gallery } from "./pages/Gallery";
import { Landing } from "./pages/Landing";
import { SearchPage } from "./pages/SearchPage";
import { ShopPage } from "./pages/ShopPage";
import { DashboardPage } from "./pages/DashboardPage";
import { SlideshowPage } from "./pages/SlideshowPage";
import { StudentsPage } from "./pages/StudentsPage";
import { HomeworkPage } from "./pages/HomeworkPage";
import { ContentPage } from "./pages/ContentPage";
import { VideoPage } from "./pages/VideoPage";
import { WorkspacePage } from "./pages/WorkspacePage";
import { LabPage } from "./pages/LabPage";

const routes = [
  { hash: "#/", title: "Hjem", page: <Landing /> },
  { hash: "#/komponenter", title: "Komponenter", page: <Gallery /> },
  { hash: "#/sok", title: "Søk", page: <SearchPage /> },
  { hash: "#/butikk", title: "Nettbutikk", page: <ShopPage /> },
  { hash: "#/dashbord", title: "Dashbord", page: <DashboardPage /> },
  { hash: "#/presentasjon", title: "Presentasjon", page: <SlideshowPage /> },
  { hash: "#/elever", title: "Elever", page: <StudentsPage /> },
  { hash: "#/lekser", title: "Lekser", page: <HomeworkPage /> },
  { hash: "#/innhold", title: "Innhold", page: <ContentPage /> },
  { hash: "#/video", title: "Video", page: <VideoPage /> },
  { hash: "#/arbeidsflate", title: "Arbeidsflate", page: <WorkspacePage /> },
  { hash: "#/lab", title: "Lab", page: <LabPage /> },
];

function useHashRoute() {
  const [hash, setHash] = useState(window.location.hash || "#/");
  useEffect(() => {
    const onChange = () => {
      setHash(window.location.hash || "#/");
      window.scrollTo(0, 0);
    };
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);
  return hash;
}

function App() {
  const hash = useHashRoute();
  const route = routes.find((r) => r.hash === hash) ?? routes[0];

  return (
    <>
      <NavigationBar
        logo={<Logo />}
        onSearchClick={() => (location.hash = "#/sok")}
        onProfileClick={() => (location.hash = "#/elever")}
      />
      <ContextualNavigationBar label="Hovedmeny">
        {routes.map((r) => (
          <MenuItem key={r.hash} href={r.hash} active={r.hash === route.hash}>
            {r.title}
          </MenuItem>
        ))}
        <MenuItem href="statisk.html">Statisk</MenuItem>
      </ContextualNavigationBar>
      {route.page}
    </>
  );
}

export default App;
