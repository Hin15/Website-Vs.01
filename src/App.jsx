// src/App.jsx
import { useEffect, useState } from "react";
import Navbar from "./components/HomePage/Navbar.jsx";
import Carousel from "./components/HomePage/Carousel.jsx";
import SponsorsMarquee from "./components/HomePage/SponsorsMarquee.jsx";

export default function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [projectOpen, setProjectOpen] = useState(false);

  useEffect(() => {}, []);

  return (
    <div className="relative grid min-h-[100vh] place-items-center bg-gradient-to-br from-red-900 via-blue-800 to-pink-500 text-white overflow-hidden">
      <header className="min-h-screen text-gray-800">
        <Navbar 
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
          projectOpen={projectOpen}
          setProjectOpen={setProjectOpen}
        />
      </header>
      <div>
        <section>
          <Carousel />
        </section>
      </div>
      <div>
        <section>
          <SponsorsMarquee />
        </section>
      </div>
    </div>
  );
}
