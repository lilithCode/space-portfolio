import React, { Suspense, lazy, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { OrbitControls } from "@react-three/drei";
import Loader from "./components/Loader";
import "./App.css";

const WarpTunnel = lazy(() => import("./components/WarpEffect"));
const RotatingStars = lazy(() => import("./components/RotatingStars"));
const SpacecraftModel = lazy(() => import("./components/Spacecraft"));
const HolographicMsg = lazy(() => import("./components/HolographicMsg"));
const AboutPlanet = lazy(() => import("./components/AboutPlanet"));
const ProjectPlanet = lazy(() => import("./components/ProjectPlanet"));
const ContactPlanet = lazy(() => import("./components/ContactPlanet"));
const SkillsPlanet = lazy(() => import("./components/SkillsPlanet"));
const About = lazy(() => import("./components/Aboutme"));

function Scene() {
  const location = useLocation();
  const [showModel, setShowModel] = useState(false);
  const [key, setKey] = useState(0);

  useEffect(() => {
    document.body.style.cursor = "none";
    return () => {
      document.body.style.cursor = "default";
    };
  }, []);

  useEffect(() => {
    setShowModel(false);
    setKey((prevKey) => prevKey + 1);
     <WarpTunnel  onComplete={handleWarpComplete} />;
  }, [location.pathname]);

  const handleWarpComplete = () => {
    setShowModel(true);
  };

  return (
    <div className="bg-black w-full h-screen">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={1} />
        <directionalLight position={[10, 10, 10]} intensity={5} />
        <Suspense fallback={<Loader />}>
          {!showModel && (
            <WarpTunnel key={key} onComplete={handleWarpComplete} />
          )}
          {showModel && (
            <>
              <SpacecraftModel />
              <RotatingStars />
              <HolographicMsg />
              <AboutPlanet />
              <ProjectPlanet />
              <SkillsPlanet />
              <ContactPlanet />
            </>
          )}
        </Suspense>
        <OrbitControls enablePan enableZoom enableRotate />
      </Canvas>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Scene />} />
        <Route path="/about" element={<About/>} />
        <Route path="/projects" element={<ProjectPlanet />} />
        <Route path="/contact" element={<Scene />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
