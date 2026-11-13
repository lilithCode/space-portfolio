import { useCallback, useEffect, useState } from "react";
import { MotionConfig } from "framer-motion";
import { initSmoothScroll } from "./lib/scroll";
import Starfield from "./components/Starfield";
import Preloader from "./components/Preloader";
import Navbar from "./components/Navbar";
import Trajectory from "./components/Trajectory";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Journey from "./components/Journey";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function App() {
  const [ready, setReady] = useState(false);
  const handleLoaded = useCallback(() => setReady(true), []);

  useEffect(() => initSmoothScroll(), []);

  return (
    <MotionConfig reducedMotion="user">
      <a
        href="#work"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-star focus:px-4 focus:py-2 focus:text-void"
      >
        Skip to content
      </a>
      <Starfield paused={!ready} />
      <Preloader onDone={handleLoaded} />
      <Navbar ready={ready} />
      <main className="relative overflow-clip">
        <Trajectory />
        <div className="relative z-10">
          <Hero ready={ready} />
          <Projects />
          <Skills />
          <Journey />
          <About />
          <Contact />
          <Footer />
        </div>
      </main>
    </MotionConfig>
  );
}

export default App;
